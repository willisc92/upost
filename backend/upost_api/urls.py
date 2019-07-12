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
from upost.views import *
# not ideal but only works this way
from upost.views.User_Event_Channel_Relations import SubscribeView, AttendView
from django.conf import settings
from django.conf.urls.static import static
from frontendapp import urls as frontendapp_urls

router = routers.DefaultRouter()
# naming scheme: register('link_name', viewSet, 'base_name')
router.register('interests', InterestView, 'interest')
router.register(
    'channels', ContentChannel_View, 'channel')
router.register('accounts', UserAccountView, 'account')
router.register('user-interests', UserInterestView, 'user-interest')
router.register('user-communities', UserCommunitiesView, 'user-community')
router.register('posts', Post_View, 'post')
router.register('events', Event_View, 'event')
router.register('communities', CommunityView, 'community')
router.register(
    'random-posts', Random_Post_view, 'random-post')
router.register(
    'incentive-packages', IncentivePackageView, 'incentive-package')
router.register('incentive-choices',
                IncentiveChoiceView, 'incentive-choice')
router.register(
    'diet-options', DietOptionView, 'diet-option')
router.register('user-subscriptions',
                UserAccountSubscriptionsView, 'user-subscription')
router.register('subscriptions', SubscribeView, 'subscription')
router.register('user-attendance', UserAccountAttendsView, 'user-attend')
router.register('attendance', AttendView, 'attend')


urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/me/', UserDetailView.as_view(), name='me'),
    path('api/free-food/', Free_Food_Event_View.as_view(), name='free-food'),
    path('api/non-interest-posts/', Non_Interest_Post_View.as_view(),
         name='non-interest-posts'),
    path('api/random-post/', Random_Non_Interest_Post_view.as_view(),
         name='random-post'),
    path('api/community-posts/', Community_Post_view.as_view(),
         name='community-posts'),
    path('api/auth/', include('rest_framework_social_oauth2.urls')),
    re_path(r'', include(frontendapp_urls))
]
