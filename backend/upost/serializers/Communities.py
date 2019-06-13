from rest_framework import serializers
from ..models.Shared import Community

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Community
