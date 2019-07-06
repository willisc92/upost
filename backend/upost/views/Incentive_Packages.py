from rest_framework import viewsets
from ..serializers.Incentive_Packages import IncentiveSerializer, IncentiveChoiceSerializer, DietOptionSerializer
from ..models.Incentive_Packages import IncentivePackage, IncentiveChoice, DietOption
from ..filters import IncentiveFilter
from ..permissions import IsOwnerOrReadOnly, EventAccessPermission, IsAdminOrReadOnly, IncentiveAccessPermission
from rest_framework import permissions


class IncentivePackageView(viewsets.ModelViewSet):
    serializer_class = IncentiveSerializer
    queryset = IncentivePackage.objects.all()
    filterset_class = IncentiveFilter

    permission_classes = (
        permissions.IsAuthenticated,
        IncentiveAccessPermission,
    )


class IncentiveChoiceView(viewsets.ModelViewSet):
    serializer_class = IncentiveChoiceSerializer
    queryset = IncentiveChoice.objects.all()
    filterset_fields = ('incentive_name',)
    permission_classes = (permissions.IsAuthenticated, IsAdminOrReadOnly,)


class DietOptionView(viewsets.ModelViewSet):
    serializer_class = DietOptionSerializer
    queryset = DietOption.objects.all()
    filterset_fields = ('diet_option',)
    permission_classes = (permissions.IsAuthenticated, IsAdminOrReadOnly,)
