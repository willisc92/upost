from rest_framework import generics
from ..models import ContentChannel
from ..serializers import ContentChannelSerializer


class ListContentChannel(generics.ListCreateAPIView):
    queryset = ContentChannel.objects.all()
    serializer_class = ContentChannelSerializer


class DetailContentChannel(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContentChannel.objects.all()
    serializer_class = ContentChannelSerializer
