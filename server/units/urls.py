from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    path('units/', views.unit_list),
    path('units/<int:pk>/', views.unit_operations),
    path('units/export/', views.export_units, name='export_units'),
]
