from rest_framework import serializers
from ..models.Shared import Community
from ..models.User_Account import CustomUser
from ..models.Channels_Posts_Events import Post


class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Community

    community_posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())


class UserCommunitiesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'community')
        model = CustomUser
