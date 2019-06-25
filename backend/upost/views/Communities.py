from rest_framework import viewsets
from ..serializers.Communities import CommunitySerializer
from ..models.Shared import Community
from ..permissions import IsAdminOrReadOnly
from rest_framework import permissions


class CommunityView(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()
    filterset_fields = ('community_name',)

    permission_classes = (permissions.IsAuthenticated, IsAdminOrReadOnly,)
