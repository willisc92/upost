from rest_framework import serializers
from ..models.User_Account import CustomUser
from django.contrib.auth.hashers import make_password

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('password', 'username', 'email', 'first_name', 'middle_name',
            'last_name', 'birth_date', 'country', 'state', 'street_name',
            'postal_code', 'city', 'sex', 'phone_number', 'interests')
        model = CustomUser

    validate_password = make_password  # performs password hashing during post, inprogress
