from rest_framework import viewsets
from ..serializers.User_Account import UserAccountSerializer
from ..models.User_Account import CustomUser
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


# Create your views here.
class UserAccountView(viewsets.ModelViewSet):
    serializer_class = UserAccountSerializer
    queryset = CustomUser.objects.all()


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
            'first_name': user.first_name,
            'last_name': user.last_name
        })

    @classmethod
    def get_extra_actions(cls):
        return []
