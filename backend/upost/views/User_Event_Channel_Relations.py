from rest_framework import viewsets
from ..serializers.User_Event_Channel_Relations import SubscribeSerializer, AttendSerializer
from ..models.User_Event_Channel_Relations import Subscribe, Attend
from ..models.Channels_Posts_Events import ContentChannel, PostEvent
from ..models.User_Account import CustomUser
from datetime import datetime
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.utils import timezone


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
        instance = Attend.objects.filter(attendee=request.data['attendee'], event=request.data['event_id'])
        if len(instance):
            instance = instance[0]
            instance.delete()
        return Response(status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        event_id = self.request.data['event']
        attendee_id = self.request.data['attendee']
        event = PostEvent.objects.get(pk=event_id)

        if Attend.objects.filter(event=event_id).count() >= event.capacity:  # event full
            return JsonResponse({'error': 'The event has filled, please refresh the page'},
                status=status.HTTP_400_BAD_REQUEST)
        elif event.planned_end_date <= timezone.now():  # event passed
            return JsonResponse({'error': 'The event has passed, you are unable to register'},
                status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = AttendSerializer(data=self.request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({'error': 'An error has occured. Please refresh and try again or try again later.'},
                    status=status.HTTP_400_BAD_REQUEST)
