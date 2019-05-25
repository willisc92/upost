from rest_framework import serializers
from ..models.Shared import Interest


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Interest
