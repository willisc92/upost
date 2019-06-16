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
from django.urls import include, path, re_path
from rest_framework import routers
from upost.views import Channels_Posts_Events, User_Account, Communities, Shared
from django.conf import settings
from django.conf.urls.static import static
from frontendapp import urls as frontendapp_urls

router = routers.DefaultRouter()
# naming scheme: register('link_name', viewSet, 'base_name')
router.register('interests', Shared.InterestView, 'interest')
router.register('channels', Channels_Posts_Events.ContentChannel_View, 'channel')
router.register('accounts', User_Account.UserAccountView, 'account')
router.register('user-interests', Shared.UserInterestView, 'user-interest')
router.register('posts', Channels_Posts_Events.Post_View, 'post')
router.register('events', Channels_Posts_Events.Event_View, 'event')
router.register('communities', Communities.CommunityView, 'community')
router.register('random-posts', Channels_Posts_Events.Random_Post_view, 'random-post')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', User_Account.CustomAuthToken.as_view()),
    re_path(r'', include(frontendapp_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
