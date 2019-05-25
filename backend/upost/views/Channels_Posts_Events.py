from rest_framework import generics
from rest_framework import viewsets
from ..models import ContentChannel
from ..serializers import ContentChannelSerializer


class Channel_Post_Events_View(viewsets.ModelViewSet):
    serializer_class = ContentChannelSerializer
    queryset = ContentChannel.objects.all()


class ListContentChannel(generics.ListCreateAPIView):
    queryset = ContentChannel.objects.all()
    serializer_class = ContentChannelSerializer


class DetailContentChannel(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContentChannel.objects.all()
    serializer_class = ContentChannelSerializer
