from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import *
import datetime
from django import forms
import re


class DateInput(forms.DateInput):
    input_type = 'date'


class TimeInput(forms.TimeInput):
    input_type = 'time'


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserChangeForm):
        model = CustomUser
        fields = (
            'username', 'email', 'first_name', 'middle_name', 'last_name', 'birth_date',
           'interests')
        widgets = {
            'birth_date': DateInput()
        }


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = CustomUser
        fields = (
            'username', 'email', 'first_name', 'middle_name', 'last_name', 'birth_date', 
            'password', 'interests')

        widgets = {
            'birth_date': DateInput()
        }

    def clean(self):
        cd = self.cleaned_data

        if cd.get('birth_date') >= datetime.datetime.now().date():
            raise forms.ValidationError("Invalid birthdate.")

        if not re.match(r'[0-9]{10}', cd.get('phone_number')):
            raise forms.ValidationError("Must enter a 10 digit phone number")

        if not re.match(r'[A-Z]\d[A-Z]\d[A-Z]\d', cd.get('postal_code')):
            raise forms.ValidationError("Postal code must be in the form A2A2A2")

        return cd
