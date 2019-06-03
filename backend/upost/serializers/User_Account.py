from rest_framework import serializers
from ..models.User_Account import CustomUser
from ..models.Channels_Posts_Events import ContentChannel
from django.contrib.auth.hashers import make_password


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('password', 'username', 'email', 'first_name', 'middle_name',
            'last_name', 'birth_date', 'country', 'state', 'street_name',
            'postal_code', 'city', 'sex', 'phone_number', 'interests', 'channels')
        model = CustomUser

    channels = serializers.PrimaryKeyRelatedField(many=True, queryset=ContentChannel.objects.all())

    def create(self, validated_data):  # for POST to hash passwords
        user = CustomUser.objects.create(
            password=make_password(validated_data['password']),  # hashes the password
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            middle_name=validated_data['middle_name'],
            last_name=validated_data['last_name'],
            birth_date=validated_data['birth_date'],
            country=validated_data['country'],
            state=validated_data['state'],
            street_name=validated_data['street_name'],
            postal_code=validated_data['postal_code'],
            city=validated_data['city'],
            sex=validated_data['sex'],
            phone_number=validated_data['phone_number'],
        )
        return user
