from rest_framework import generics, viewsets
from ..models import ContentChannel
from ..serializers import ContentChannelSerializer

from rest_framework import permissions
from ..permissions import IsOwnerOrReadOnly


class Channel_Post_Events_View(viewsets.ModelViewSet):
    serializer_class = ContentChannelSerializer
    queryset = ContentChannel.objects.all()
    filterset_fields = ('user',)


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
