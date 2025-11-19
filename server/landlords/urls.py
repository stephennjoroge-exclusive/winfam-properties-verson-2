from django.urls import path
from . import views

urlpatterns = [
    path('landlords/', views.landlord),
    path('landlords/<int:pk>/', views.landlord_operations),
    
]
