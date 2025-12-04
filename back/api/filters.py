import django_filters as df
from django.db.models import Q
from django.utils import timezone
from datetime import time, datetime
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
    value = df.NumberFilter(field_name='value', lookup_expr='icontains') 

    date = df.DateFilter(field_name='timestamp', lookup_expr='date')
    
    hour = df.NumberFilter(method='filter_by_local_hour_range')

    hours = df.NumberFilter(method='filter_by_interval_hour_range')

    def filter_by_local_hour_range(self, queryset, name, value):
        if value is None:
            return queryset
        
        current_tz = timezone.get_current_timezone()
        now = datetime.now(current_tz)
        
        start_time = now.replace(hour=int(value), minute=0, second=0, microsecond=0)
        end_time = start_time.replace(hour=int(value), minute=59, second=59, microsecond=999999)
        
        return queryset.filter(timestamp__range=(start_time, end_time))
    
    def filter_by_interval_hour_range(self, queryset, name, value):
        if value is None:
            return queryset

        value = value -1 if value == 24 else value
        
        current_tz = timezone.get_current_timezone()
        today = datetime.now(current_tz).date() # Apenas a data de hoje

        start_time = datetime.combine(today, time(0, 0, 0), tzinfo=current_tz)
    
        # Define o final do intervalo para o último microsegundo da hora 8 (23:59:59 da hora 8)
        end_time = datetime.combine(today, time(int(value), 59, 59, 999999), tzinfo=current_tz)

        return queryset.filter(timestamp__range=(start_time, end_time))

    class Meta:
        model = History
        fields = ['sensor_id', 'sensor', 'value', 'date', 'hour', 'hours']
