"""upost_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from upost.views import Interest, Channels_Posts_Events, User_Account, ListContentChannel

router = routers.DefaultRouter()
# naming scheme: register('link_name', viewSet, 'base_name')
router.register('interests', Interest.InterestView, 'interest')
router.register(
    'channels', Channels_Posts_Events.Channel_Post_Events_View, 'channel')
router.register('accounts', User_Account.UserAccountView, 'account')
router.register('token-auth', User_Account.CustomAuthToken, 'token-auth')


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/', include('upost.urls')),
    path('api/', include(router.urls)),
    path('api/token-auth/', User_Account.CustomAuthToken.as_view()),
    # path('api/rest-auth/', include('rest_auth.urls')),
    # path('api/rest-auth/registration/', include('rest_auth.registration.urls'))
]
