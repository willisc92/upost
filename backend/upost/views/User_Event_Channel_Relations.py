from rest_framework import viewsets
from ..serializers.User_Event_Channel_Relations import SubscribeSerializer
from ..models.User_Event_Channel_Relations import Subscribe
from datetime import datetime
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class SubscribeView(viewsets.ModelViewSet):
    serializer_class = SubscribeSerializer
    queryset = Subscribe.objects.all()

    def create(self, request):
        subscribe = Subscribe.objects.filter(channel=request.data['channel'],
                    community_member=request.data['community_member'])
        if len(subscribe):
            subscribe = subscribe[0]
            if subscribe.unsubscribe_date is None:
                subscribe.unsubscribe_date = datetime.now()
            else:
                subscribe.unsubscribe_date = None
            subscribe.save()
            return Response(status=status.HTTP_200_OK)
        else:
            subscribe = Subscribe.objects.create(request.data)
            return Response(status=status.HTTP_201_CREATED)
