from rest_framework import viewsets
from ..serializers.User_Account import UserAccountSerializer, UserAccountSubscriptionsSerializer, UserDetailSerializer
from ..models.User_Account import CustomUser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsAuthenticatedOrCreate
from rest_framework import generics


# Create your views here.
class UserAccountView(viewsets.ModelViewSet):
    serializer_class = UserAccountSerializer
    queryset = CustomUser.objects.all()
    filterset_fields = ('username',)
    permission_classes = (IsAuthenticatedOrCreate,)

    def create(self, request):  # for POST, calls create in serializer defines return response
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = serializer.instance
        headers = self.get_success_headers(serializer.data)
        return Response({
            'user_id': user.pk,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name},
            status=status.HTTP_201_CREATED,
            headers=headers)


class UserDetailView(generics.RetrieveAPIView):
    """
    Use this endpoint to retrieve user.
    """
    # Set the AUTH_USER_MODEL in settings.py file to make it work with custom user models as well.
    model = CustomUser
    serializer_class = UserDetailSerializer
    # Set the permission class if not already set by default
    permission_classes = (IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        return self.request.user


class UserAccountSubscriptionsView(viewsets.ModelViewSet):
    serializer_class = UserAccountSubscriptionsSerializer
    queryset = CustomUser.objects.all()
