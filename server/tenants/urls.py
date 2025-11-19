from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('tenants/', views.tenants_list),
    path('tenants/<int:pk>/', views.tenants_operations),
    path('tenants_stats/<int:pk>/stats/', views.tenants_stats),
    path('tenants/export/', views.export_tenants),
]
