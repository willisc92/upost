from rest_framework import serializers
from ..models import ContentChannel, Post, Interest, PostEvent, Community, CustomUser
from rest_framework.validators import UniqueValidator
from ..serializers import IncentiveSerializer


class ContentChannelPathInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('channel_id', 'channel_name')
        model = ContentChannel


class PostPathInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('post_id', 'post_title')
        model = Post


class PostPathSerializer(serializers.Serializer):
    channel = ContentChannelPathInfoSerializer(source='*')


class EventPathSerializer(serializers.Serializer):
    channel = ContentChannelPathInfoSerializer()
    post = PostPathInfoSerializer(source='*')


class EventSerializer(serializers.ModelSerializer):
    event_community = serializers.CharField(
        read_only=True, source="post.community.community_name")
    event_owner = serializers.CharField(
        read_only=True, source="post.user")
    post_deleted_flag = serializers.BooleanField(
        read_only=True, source="post.deleted_flag")
    post_picture = serializers.ImageField(
        read_only=True, source="post.picture")
    capacity_status = serializers.SerializerMethodField()

    class Meta:
        fields = (
            'event_id',
            'post',
            'event_title',
            'event_description',
            'cost',
            'location',
            'capacity',
            'planned_start_date',
            'planned_end_date',
            'event_incentive',
            'deleted_flag',
            'creation_date',
            'deletion_date',
            'event_community',
            'event_owner',
            'post_deleted_flag',
            'last_updated',
            'capacity_status',
            'path',
            'post_picture'
        )
        model = PostEvent

    post = serializers.PrimaryKeyRelatedField(
        read_only=False, many=False, queryset=Post.objects.all())
    event_incentive = IncentiveSerializer(many=False, required=False)
    path = EventPathSerializer(source='post', many=False, read_only=True)

    def get_capacity_status(self, obj):
        return obj.event_to_attend.count()


class PostSerializer(serializers.ModelSerializer):
    channel_deleted_flag = serializers.BooleanField(
        read_only=True, source="channel.deleted_flag")

    class Meta:
        fields = (
            'post_id',
            'post_title',
            'poster_name',
            'phone_number',
            'email',
            'post_description',
            'user',
            'channel',
            'post_timestamp',
            'deleted_flag',
            'tags',
            'community',
            'post_events',
            'picture',
            'post_incentive',
            'deletion_date',
            'channel_deleted_flag',
            'last_updated',
            'path'
        )
        model = Post

    user = serializers.ReadOnlyField(source='user.username')
    channel = serializers.PrimaryKeyRelatedField(
        read_only=False, many=False, queryset=ContentChannel.objects.all())
    tags = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Interest.objects.all())
    post_events = EventSerializer(many=True, required=False)
    post_incentive = IncentiveSerializer(many=False, required=False)
    post_title = serializers.CharField(max_length=50, validators=[
        UniqueValidator(message="Post title must be unique", queryset=Post.objects.all())])
    community = serializers.PrimaryKeyRelatedField(
        many=False, queryset=Community.objects.all())
    path = PostPathSerializer(source='channel', read_only=True, many=False)
    extra_kwargs = {'picture': {'required': False}}

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            'channel_posts',
            'last_updated',
            'picture'
        )
        model = ContentChannel

    channel_posts = PostSerializer(many=True, read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    channel_name = serializers.CharField(max_length=50, validators=[
        UniqueValidator(message="Channel name must be unique", queryset=ContentChannel.objects.all())])
    extra_kwargs = {'picture': {'required': False}}
