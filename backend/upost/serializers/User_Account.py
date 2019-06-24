from rest_framework import serializers
from ..models.User_Account import CustomUser
from ..models.Channels_Posts_Events import ContentChannel
from ..models.Shared import Community
from django.contrib.auth.hashers import make_password


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('password', 'username', 'email', 'first_name', 'middle_name',
                  'last_name', 'birth_date', 'interests', 'channels', 'community')
        model = CustomUser

    channels = serializers.PrimaryKeyRelatedField(
        many=True, queryset=ContentChannel.objects.all(), required=False)
    community = serializers.PrimaryKeyRelatedField(
        many=True, required=False, queryset=Community.objects.all())

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
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email',
                  'username', 'channels', 'community',)
