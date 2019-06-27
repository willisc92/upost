from rest_framework import viewsets
from ..serializers.Interest import InterestSerializer, UserInterestSerializer
from ..models.Shared import Interest
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
