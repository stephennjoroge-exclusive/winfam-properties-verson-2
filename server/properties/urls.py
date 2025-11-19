from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('property/', views.property_list), 
    path('property/<int:pk>/', views.property_operations), 
]
