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


    validate_password = make_password  # performs password hashing during post, inprogress
