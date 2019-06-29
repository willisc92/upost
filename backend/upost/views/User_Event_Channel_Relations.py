from rest_framework import viewsets
from ..serializers.User_Event_Channel_Relations import SubscribeSerializer, AttendSerializer
from ..models.User_Event_Channel_Relations import Subscribe, Attend
from ..models.Channels_Posts_Events import ContentChannel
from ..models.User_Account import CustomUser
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
            channel = ContentChannel.objects.get(pk=request.data['channel'])
            user = CustomUser.objects.get(pk=request.data['community_member'])
            subscribe = Subscribe.objects.create(channel=channel, community_member=user)
            return Response(status=status.HTTP_201_CREATED)


class AttendView(viewsets.ModelViewSet):
    serializer_class = AttendSerializer
    queryset = Attend.objects.all()

    def delete(self, request):
        print(request.data)
        user = CustomUser.objects.get(pk=request.data['attendee'])
        instance = Attend.objects.filter(attendee=user, post=request.data['event_id'])
        if len(instance):
            instance = instance[0]
            instance.delete()
        return Response(status=status.HTTP_200_OK)
