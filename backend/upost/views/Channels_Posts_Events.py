from rest_framework import generics, viewsets
from ..models import ContentChannel, Post, PostEvent
from ..serializers import ContentChannelSerializer, PostSerializer, EventSerializer

from rest_framework import permissions
from ..permissions import IsOwnerOrReadOnly, EventAccessPermission


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

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


class Event_View(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = PostEvent.objects.all()
    filterset_fields = ('post', 'location', 'capacity',
                        'planned_start_date', 'planned_end_date')

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        EventAccessPermission,
    )
