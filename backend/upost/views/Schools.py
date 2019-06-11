from rest_framework import viewsets
from ..serializers.Schools import SchoolSerializer
from ..models.Shared import School


class SchoolView(viewsets.ModelViewSet):
    serializer_class = SchoolSerializer
    queryset = School.objects.all()
