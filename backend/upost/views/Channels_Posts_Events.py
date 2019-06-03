from rest_framework import generics, viewsets
from ..models import ContentChannel, Post
from ..serializers import ContentChannelSerializer, PostSerializer

from rest_framework import permissions
from ..permissions import IsOwnerOrReadOnly


class ContentChannel_View(viewsets.ModelViewSet):
    serializer_class = ContentChannelSerializer
    queryset = ContentChannel.objects.all()
    filterset_fields = ('user', 'channel_id')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


class Post_View(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filterset_fields = ('post_id', 'channel_id', 'user')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        seraliizer.save(channel=self.request.channel)

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
