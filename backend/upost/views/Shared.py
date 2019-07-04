from rest_framework import viewsets
from ..serializers.Interest import InterestSerializer, UserInterestSerializer
from ..serializers.Communities import CommunitySerializer, UserCommunitiesSerializer
from ..models.Shared import Interest
from ..models.Shared import Community
from ..models.User_Account import CustomUser
from django.shortcuts import get_object_or_404
from ..permissions import IsAdminOrReadOnly
from rest_framework import permissions


# Create your views here.
class InterestView(viewsets.ModelViewSet):
    serializer_class = InterestSerializer
    queryset = Interest.objects.all()
    permission_classes = (IsAdminOrReadOnly,)


class UserInterestView(viewsets.ModelViewSet):
    serializer_class = UserInterestSerializer
    queryset = CustomUser.objects.all()


class CommunityView(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()
    filterset_fields = ('community_name',)

    permission_classes = (permissions.IsAuthenticated, IsAdminOrReadOnly,)

class UserCommunitiesView(viewsets.ModelViewSet):
    serializer_class = UserCommunitiesSerializer
    queryset = CustomUser.objects.all()
