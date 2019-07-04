from rest_framework import serializers
from ..models.User_Event_Channel_Relations import Subscribe, Attend


class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Subscribe


class SubscribeSerializerIdOnly(serializers.ModelSerializer):
    class Meta:
        fields = ('channel',)
        model = Subscribe


class AttendSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('event', 'attendee')
        model = Attend
