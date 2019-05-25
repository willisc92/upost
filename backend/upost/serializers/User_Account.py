from rest_framework import serializers
from ..models.User_Account import CustomUser


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('password', 'username', 'email', 'first_name', 'date_joined',
        'first_name', 'middle_name', 'last_name', 'birth_date', 'country',
        'state', 'street_name', 'postal_code', 'city', 'sex', 'phone_number',
        'interests')
        model = CustomUser
