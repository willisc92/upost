from rest_framework import serializers
from ..models.Shared import Interest
from ..models.User_Account import CustomUser


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Interest


class UserInterestSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'interests')
        model = CustomUser
