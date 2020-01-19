from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all', views.allMeasures, name='allMeasures'),
    path('calculate/silaKompresji/<str:silaKompresji>/format/<str:format>', views.compressionCalculation, name='compressionCalculation'),
]