from rest_framework import serializers
from ..models import ContentChannel, Post, Interest, PostEvent
from rest_framework.validators import UniqueValidator


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'post_id',
            'post_title',
            'poster_name',
            'phone_number',
            'email',
            'cost',
            'post_description',
            'user',
            'channel',
            'post_timestamp',
            'deleted_flag',
            'tags',
            'post_event'    # NEW
        )
        model = Post

    user = serializers.ReadOnlyField(source='user.username')
    channel = serializers.PrimaryKeyRelatedField(
        read_only=False, many=False, queryset=ContentChannel.objects.all())
    tags = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Interest.objects.all())
    post_event = serializers.PrimaryKeyRelatedField(read_only=False, many=False,
                                                    queryset=PostEvent.objects.all(), required=False)  # NEW


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'post',
            'location',
            'capacity',
            'planned_start_date',
            'planned_end_date',
        )
        model = PostEvent
        post = serializers.PrimaryKeyRelatedField(
            read_only=False, many=False, queryset=Post.objects.all())


class ContentChannelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'channel_id',
            'user',
            'channel_name',
            'deleted_flag',
            'creation_date',
            'deletion_date',
            'channel_description',
            'channel_posts'
        )
        model = ContentChannel

    channel_posts = PostSerializer(many=True, read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    channel_name = serializers.CharField(max_length=50, validators=[
        UniqueValidator(message="Channel name must be unique", queryset=ContentChannel.objects.all())])
