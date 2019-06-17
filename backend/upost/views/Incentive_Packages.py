from rest_framework import viewsets
from ..serializers.Incentive_Packages import IncentiveSerializer, IncentiveChoiceSerializer, DietOptionSerializer
from ..models.Incentive_Packages import IncentivePackage, IncentiveChoice, DietOption


class IncentivePackageView(viewsets.ModelViewSet):
    serializer_class = IncentiveSerializer
    queryset = IncentivePackage.objects.all()


class IncentiveChoiceView(viewsets.ModelViewSet):
    serializer_class = IncentiveChoiceSerializer
    queryset = IncentiveChoice.objects.all()


class DietOptionView(viewsets.ModelViewSet):
    serializer_class = DietOptionSerializer
    queryset = DietOption.objects.all()
