from rest_framework import generics, viewsets
from ..models import ContentChannel, Post, PostEvent, Interest
from ..serializers import *

from rest_framework import permissions
from ..permissions import IsOwnerOrReadOnly, EventAccessPermission
from ..filters import EventFilter

from rest_framework.parsers import MultiPartParser, FormParser


class ContentChannel_View(viewsets.ModelViewSet):
    serializer_class = ContentChannelSerializer
    queryset = ContentChannel.objects.all()
    filterset_fields = ('user', 'channel_id', 'deleted_flag',)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    permission_classes = (
        permissions.IsAuthenticated, IsOwnerOrReadOnly,)

    # permission_classes = (
    #     permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


class Post_View(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser,)

    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filterset_fields = ('post_id', 'channel_id', 'user',
                        'community', 'deleted_flag',)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


class Random_Post_view(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        interest_param = self.request.query_params.get('interest')
        if interest_param is not None:
            queryset = queryset.filter(tags__interest_tag=interest_param).order_by('?')[
                :4]  # get 4 objects
        return queryset


class Event_View(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = PostEvent.objects.all()
    filterset_class = EventFilter

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        EventAccessPermission,
    )
