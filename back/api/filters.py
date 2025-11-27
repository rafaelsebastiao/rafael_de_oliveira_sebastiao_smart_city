import django_filters as df
from django.db.models import Q
from .models import Sensor, History, Environment

class SensorFilter(df.FilterSet):
    sensor = df.CharFilter(lookup_expr='icontains')
    local = df.CharFilter(field_name="environment__local__local", lookup_expr='exact')
    status = df.BooleanFilter(field_name="status", lookup_expr='exact' )
    
    def sensor_filter(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(Q(sensor__icontains=value) | Q(sensor__iexact=value))


class HistoryFilter(df.FilterSet):
    sensor_id = df.NumberFilter(field_name="sensor__id", lookup_expr="exact")
    sensor = df.CharFilter(field_name='sensor__sensor', lookup_expr='icontains')
    value = df.NumberFilter(field_name='value', lookup_expr='icontains'),

    date = df.DateFilter(field_name='timestamp', lookup_expr='date')
    hour = df.NumberFilter(field_name='timestamp', lookup_expr='hour')


    def sensor_filter(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(Q(sensor__icontains=value) | Q(sensor__iexact=value))