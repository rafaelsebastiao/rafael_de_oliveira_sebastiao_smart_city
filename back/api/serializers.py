from rest_framework import serializers
from .models import Local, Responsible, Environment, Sensor, History


class LocalSerializer(serializers.ModelSerializer):
    class Meta:
        model=Local
        fields=['id', 'local']

class ResponsibleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Responsible
        fields=['id', 'name']

class EnvironmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Environment
        fields = ['id', 'local', 'description', 'responsible']

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model =Sensor
        fields = ['id', 'sensor', 'mac_address', 'unity_mec', 'latitude', 'longitude', 'status', 'environment']


class HistorySerializer(serializers.ModelSerializer):
     class Meta:
        model = History
        fields = ['id', 'sensor', 'value', 'timestamp']