from rest_framework import serializers
from ..models.Shared import School


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = School
