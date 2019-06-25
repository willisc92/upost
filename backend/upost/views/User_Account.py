from rest_framework import viewsets
from ..serializers.User_Account import UserAccountSerializer, UserAccountSubscriptionsSerializer
from ..models.User_Account import CustomUser
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


# Create your views here.
class UserAccountView(viewsets.ModelViewSet):
    serializer_class = UserAccountSerializer
    queryset = CustomUser.objects.all()
    filterset_fields = ('username',)

    def create(self, request):  # for POST, calls create in serializer defines return response
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = serializer.instance
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name},
            status=status.HTTP_201_CREATED,
            headers=headers)


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name
        })

    # @classmethod
    # def get_extra_actions(cls):
    #     return []


class UserAccountSubscriptionsView(viewsets.ModelViewSet):
    serializer_class = UserAccountSubscriptionsSerializer
    queryset = CustomUser.objects.all()
