from rest_framework import serializers
from ..models.User_Account import CustomUser
from ..models.Channels_Posts_Events import ContentChannel
from ..models.Shared import Community
from ..models.User_Event_Channel_Relations import Subscribe
from django.contrib.auth.hashers import make_password
from ..serializers.User_Event_Channel_Relations import SubscribeSerializerIdOnly
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from ..tokens import account_activation_token
from upost_api.settings import DOMAIN_NAME
from django.contrib.auth import password_validation
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('password', 'username', 'email', 'first_name', 'middle_name',
                  'last_name', 'birth_date', 'interests', 'channels', 'community')
        model = CustomUser

    channels = serializers.PrimaryKeyRelatedField(
        many=True, queryset=ContentChannel.objects.all(), required=False)
    community = serializers.PrimaryKeyRelatedField(
        many=True, required=False, queryset=Community.objects.all())

    def validate_password(self, data):
        try:
            password_validation.validate_password(data)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data

    def validate_email(self, data):
        try:
            validate_email(data)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return data

    def create(self, validated_data):  # for POST to hash passwords
        user = CustomUser.objects.create(
            # hashes the password
            password=make_password(validated_data['password']),
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            middle_name=validated_data['middle_name'],
            last_name=validated_data['last_name'],
            birth_date=validated_data['birth_date'],
        )
        user.is_active = False
        user.save()
        send_activation_email(user)
        return user


class UserAccountSubscriptionsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'subscriptions')
        model = CustomUser

    subscriptions = serializers.SerializerMethodField('get_subscription')

    def get_subscription(self, user):
        qs = Subscribe.objects.filter(community_member=user, unsubscribe_date=None)
        serializer = SubscribeSerializerIdOnly(instance=qs, many=True)
        return map(lambda x: x['channel'], serializer.data)


class UserAccountAttendsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'attends')
        model = CustomUser


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email',
                  'username', 'channels', 'community', 'id')


def send_activation_email(user):
    context = {
            'domain': DOMAIN_NAME,
            'url': 'activate',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user)
        }
    email_html_message = render_to_string('email/acc_active_email.html', context)
    email_plaintext_message = render_to_string('email/acc_active_email.txt', context)
    msg = EmailMultiAlternatives('Activate your UPost Account', email_plaintext_message,
        'UPost team <noreply@upostwebsite.com>', to=[user.email, ])
    msg.attach_alternative(email_html_message, 'text/html')
    msg.send()
