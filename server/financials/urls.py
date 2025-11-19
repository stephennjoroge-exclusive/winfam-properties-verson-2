from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('payments/', views.payments),
    path('payments/<int:pk>/', views.payment_operations),
    path('expenses/', views.expenses),
    path('expenses/<int:pk>/', views.expenses_operations),
    path('utilities/', views.utilities),
]
