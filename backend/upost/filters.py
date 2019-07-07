from .models import PostEvent, IncentivePackage
from django_filters import rest_framework as filters


class EventFilter(filters.FilterSet):
    planned_start_date_gte = filters.DateTimeFilter(
        field_name="planned_start_date", lookup_expr='gte')
    planned_end_date_gte = filters.DateTimeFilter(
        field_name="planned_end_date", lookup_expr='gte')
    planned_start_date_lte = filters.DateTimeFilter(
        field_name="planned_start_date", lookup_expr='lte')
    planned_end_date_lte = filters.DateTimeFilter(
        field_name="planned_end_date", lookup_expr='lte')

    class Meta:
        model = PostEvent
        fields = ('post', 'location', 'capacity', 'planned_start_date_gte',
                  'planned_end_date_gte', 'planned_start_date_lte', 'planned_end_date_lte', 'event_id')


class IncentiveFilter(filters.FilterSet):
    planned_start_date_gte = filters.DateTimeFilter(
        field_name="planned_start_date", lookup_expr='gte')
    planned_end_date_gte = filters.DateTimeFilter(
        field_name="planned_end_date", lookup_expr='gte')
    planned_start_date_lte = filters.DateTimeFilter(
        field_name="planned_start_date", lookup_expr='lte')
    planned_end_date_lte = filters.DateTimeFilter(
        field_name="planned_end_date", lookup_expr='lte')

    class Meta:
        model = IncentivePackage
        fields = ('post', 'incentive_type', 'diet_option', 'planned_start_date_gte',
                  'planned_end_date_gte', 'planned_start_date_lte', 'planned_end_date_lte')
