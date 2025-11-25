import django_filters as df
from django.db.models import Q
from .models import Sensor, History

class SensorFilter(df.FilterSet):
    sensor = df.CharFilter(lookup_expr='icontains')

    
    def sensor_filter(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(Q(sensor__icontains=value) | Q(sensor__iexact=value))

    class Meta:
        model = Sensor
        fields = ['sensor', 'status', 'environment']

        


class HistoryFilter(df.FilterSet):
    sensor = df.CharFilter(field_name='sensor__sensor', lookup_expr='icontains')
    hour = df.NumberFilter(field_name='timestamp', lookup_expr='hour')

    def sensor_filter(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(Q(sensor__icontains=value) | Q(sensor__iexact=value))
    
    class Meta:
        model = History
        fields = ['sensor', 'hour']