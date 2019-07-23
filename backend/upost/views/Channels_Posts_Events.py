from rest_framework import generics, viewsets
from ..models import ContentChannel, Post, PostEvent, Interest, CustomUser, Community, Attend
from ..serializers import *

from rest_framework import permissions
from ..permissions import IsOwnerOrReadOnly, EventAccessPermission
from ..filters import EventFilter
from rest_framework import filters

from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime
from rest_framework.response import Response
from rest_framework import status


class ContentChannel_View(viewsets.ModelViewSet):
    serializer_class = ContentChannelSerializer
    queryset = ContentChannel.objects.all()
    filterset_fields = ('user', 'channel_id', 'deleted_flag',)
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    search_fields = ('channel_name', 'channel_description',)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    permission_classes = (
        permissions.IsAuthenticated, IsOwnerOrReadOnly,)


class Post_View(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    serializer_class = PostSerializer
    queryset = Post.objects.all()
    filterset_fields = ('post_id', 'channel_id', 'user',
                        'community', 'deleted_flag',)
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    search_fields = ('post_title', 'post_description',
                     'tags__interest_tag', 'community__community_name', 'post_incentive__incentive_type__incentive_name', 'post_incentive__ip_description')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    permission_classes = (
        permissions.IsAuthenticated, IsOwnerOrReadOnly,)


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
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    search_fields = ('event_title', 'event_description',
                     'post__tags__interest_tag', 'event_incentive__incentive_type__incentive_name',
                     'event_incentive__ip_description', 'post__community__community_name',)
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        EventAccessPermission,
    )

    def partial_update(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        if 'capacity' in request.data and serializer.get_capacity_status(instance) > int(request.data['capacity']):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)

    def update(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.get_capacity_status(instance) > int(request.data['capacity']):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)


class Free_Food_Event_View(generics.ListAPIView):
    serializer_class = EventSerializer

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
    )

    # Returns future/ongoing events that have:
    # Post related to user communities
    # Containing an event FOOD incentive
    # Has an end date time
    # Has an ongoing/future incentive datetime
    # Ordered by incentive start datetime
    def get_queryset(self):
        user = CustomUser.objects.get(pk=self.request.user.pk)
        communities = Community.objects.filter(community_users=user)
        queryset = PostEvent.objects.filter(post__community__in=communities.all(),
                                            event_incentive__isnull=False,
                                            event_incentive__incentive_type__in=[
                                                "Food"],
                                            event_incentive__planned_end_date__isnull=False,
                                            event_incentive__planned_end_date__gte=datetime.now()).order_by('event_incentive__planned_start_date')
        return queryset


class Non_Interest_Post_View(generics.ListAPIView):
    serializer_class = PostSerializer

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
    )

    # Returns all posts that are NOT relavent to user interests but in user community.
    def get_queryset(self):
        user = CustomUser.objects.get(pk=self.request.user.pk)
        communities = Community.objects.filter(community_users=user)
        interests = Interest.objects.filter(interests_users=user)
        queryset = Post.objects.exclude(
            tags__in=interests.all()).filter(community__in=communities.all()).order_by("?")
        return queryset


class Random_Non_Interest_Post_view(generics.ListAPIView):
    serializer_class = PostSerializer

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
    )

    # Returns a random post not related to interests but within community.
    # If it doesn't exist - returns a post in some other community but not relavent to interests.
    # If that doesn't exist - just grabs a random post.
    def get_queryset(self):
        user = CustomUser.objects.get(pk=self.request.user.pk)
        interests = Interest.objects.filter(interests_users=user)
        communities = Community.objects.filter(community_users=user)
        queryset = Post.objects.filter(community__in=communities.all()).exclude(
            tags__in=interests.all()).order_by("?")[:1]
        if not queryset.all():
            queryset = Post.objects.all().exclude(
                tags__in=interests.all()).order_by("?")[:1]
        if not queryset.all():
            queryset = Post.objects.all().order_by("?")[:1]
        return queryset


class Community_Post_view(generics.ListAPIView):
    serializer_class = PostSerializer

    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
    )

    # Returns posts in user's community
    def get_queryset(self):
        user = CustomUser.objects.get(pk=self.request.user.pk)
        communities = Community.objects.filter(community_users=user)
        queryset = Post.objects.filter(
            community__in=communities.all())
        return queryset
