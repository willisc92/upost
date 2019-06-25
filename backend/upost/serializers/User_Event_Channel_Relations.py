from rest_framework import serializers
from ..models.User_Event_Channel_Relations import Subscribe


class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Subscribe


class SubscribeSerializerIdOnly(serializers.ModelSerializer):
    class Meta:
        fields = ('channel',)
        model = Subscribe
