from rest_framework import viewsets
from ..serializers.User_Account import UserAccountSerializer
from ..models.User_Account import CustomUser


# Create your views here.
class UserAccountView(viewsets.ModelViewSet):
    serializer_class = UserAccountSerializer
    queryset = CustomUser.objects.all()
