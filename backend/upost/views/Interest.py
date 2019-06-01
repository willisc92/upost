from rest_framework import viewsets
from ..serializers.Interest import InterestSerializer, UserInterestSerializer
from ..models.Shared import Interest
from ..models.User_Account import CustomUser


# Create your views here.
class InterestView(viewsets.ModelViewSet):
    serializer_class = InterestSerializer
    queryset = Interest.objects.all()


class UserInterestView(viewsets.ModelViewSet):
    serializer_class = UserInterestSerializer
    queryset = CustomUser.objects.all()
