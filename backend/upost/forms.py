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
            'interests', 'community')
        widgets = {
            'birth_date': DateInput()
        }


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = CustomUser
        fields = (
            'username', 'email', 'first_name', 'middle_name', 'last_name', 'birth_date',
            'password', 'interests', 'community')

        widgets = {
            'birth_date': DateInput()
        }

    def clean(self):
        cd = self.cleaned_data

        if cd.get('birth_date') >= datetime.datetime.now().date():
            raise forms.ValidationError("Invalid birthdate.")

        return cd
