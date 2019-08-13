from rest_framework import viewsets, status
from ..serializers.User_Account import (UserAccountSerializer, UserAccountSubscriptionsSerializer, UserDetailSerializer,
                                        UserAccountAttendsSerializer, send_activation_email)
from ..models.User_Account import CustomUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from ..permissions import IsAuthenticatedOrCreate
from rest_framework import generics
from django.utils.http import urlsafe_base64_decode
from ..tokens import account_activation_token
from django.utils.encoding import force_text
from django.http import JsonResponse
from django.views import View


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


class UserAccountAttendsView(viewsets.ModelViewSet):
    serializer_class = UserAccountAttendsSerializer
    queryset = CustomUser.objects.all()


def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return JsonResponse({'message': 'successful activation'}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Activation link is invalid'}, status=status.HTTP_400_BAD_REQUEST)


class SendActivationEmailView(View):
    def get(self, request):
        try:
            user = CustomUser.objects.get(username=request.GET.get('username'))
            send_activation_email(user)
            return JsonResponse({'message': 'email sent'}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'user does not exist'}, status=status.HTTP_400_BAD_REQUEST)
