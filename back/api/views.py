from django.shortcuts import render

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView

from .models import *
from .serializers import *

from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .filters import *

import datetime as dt
from datetime import timezone
from random import randint

@api_view(['GET', 'POST'])
def list_locals(request):
    if request.method=='GET':
        queryset = Local.objects.all()
        serializers = LocalSerializer(queryset, many=True)
        return Response(serializers.data)
    elif request.method=='POST':
        serializers = LocalSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET', 'POST'])
def list_responsibles(request):
    if request.method=='GET':
        queryset = Responsible.objects.all()
        serializers = ResponsibleSerializer(queryset, many=True)
        return Response(serializers.data)
    
    elif request.method=='POST':
        serializers = ResponsibleSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def list_environments(request):
    if request.method=='GET':
        queryset = Environment.objects.all()
        serializers = EnvironmentSerializer(queryset, many=True)
        return Response(serializers.data)
    
    elif request.method=='POST':
        serializers = EnvironmentSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def list_sensors(request):
    if request.method=='GET':
        queryset = Sensor.objects.all()
        serializers = SensorSerializer(queryset, many=True)
        return Response(serializers.data)
    
    elif request.method=='POST':
        serializers = SensorSerializer(data = request.data)

        
        if serializers.is_valid():
            
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET', 'POST'])
def list_histories(request):
    if request.method=='GET':
        queryset = History.objects.all()
        serializers = HistorySerializer(queryset, many=True)
        return Response(serializers.data)
    elif request.method=='POST':
        serializers = HistorySerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        

class LocalsView(ListCreateAPIView):
    queryset = Local.objects.all()
    serializer_class = LocalSerializer
    permission_classes = [IsAuthenticated]

class ResponsiblesView(ListCreateAPIView):
    queryset = Responsible.objects.all()
    serializer_class = ResponsibleSerializer
    permission_classes = [IsAuthenticated]


class EnvironmentsView(ListCreateAPIView):
    queryset = Environment.objects.all()
    serializer_class = EnvironmentSerializer
    permission_classes = [IsAuthenticated]

class SensorsView(ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = SensorFilter

    search_fields = ['sensor', 'status', 'environment']

    #Realizar post automático em History
    def perform_create(self, serializer):
        sensor_instance = serializer.save()  
        
        #Salvar medição automaticamente no histórico
        History.objects.create(
            sensor = sensor_instance,
            #QUAL O VALOR DE SENSOR???
            value = randint(0, 100),
            timestamp = dt.datetime.now()
        )


class HistoriesView(ListCreateAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = HistoryFilter

    search_fields = ['sensor_id', 'sensor', 'value', 'hour']

class LocalDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Local.objects.all()  
    serializer_class = LocalSerializer
    permission_classes = [IsAuthenticated]


class ResponsibleDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Local.objects.all()  
    serializer_class = LocalSerializer
    permission_classes = [IsAuthenticated]


class EnvironmentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Local.objects.all()  
    serializer_class = LocalSerializer
    permission_classes = [IsAuthenticated]

class SensorsDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes =[IsAuthenticated]


class HistoriesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    permission_classes =[IsAuthenticated]
