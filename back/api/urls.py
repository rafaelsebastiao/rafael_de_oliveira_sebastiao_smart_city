from django.urls import path

from .views import *

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('locals/', LocalsView.as_view(), name='locals-list'),
    path('local/<int:pk>', LocalDetailView.as_view(), name='locals-detail'),

    path('responsibles/', ResponsiblesView.as_view(), name='responsibles-list'),
    path('responsible/<int:pk>', ResponsibleDetailView.as_view(), name='responsibles-detail'),

    path('environments/', EnvironmentsView.as_view(), name='environments-list'),
    path('environment/<int:pk>', EnvironmentDetailView.as_view(), name='environments-detail'),

    path('sensors/', SensorsView.as_view(), name='sensors-list'), 
    path('sensor/<int:pk>', SensorsDetailView.as_view(), name='sensors-detail'),
    
    path('histories/', HistoriesView.as_view(), name='histories-list'),
    path('history/<int:pk>', HistoriesDetailView.as_view(), name='histories-detail'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh')
    
]