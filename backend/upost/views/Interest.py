from rest_framework import viewsets
from ..serializers.Interest import InterestSerializer
from ..models.Shared import Interest


# Create your views here.
class InterestView(viewsets.ModelViewSet):
    serializer_class = InterestSerializer
    queryset = Interest.objects.all()
