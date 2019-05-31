from rest_framework import serializers
from ..models import ContentChannel


class ContentChannelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'channel_id',
            'user',
            'channel_name',
            'deleted_flag',
            'creation_date',
            'deletion_date',
            'channel_description'
        )
        model = ContentChannel

    user = serializers.ReadOnlyField(source='user.username')
