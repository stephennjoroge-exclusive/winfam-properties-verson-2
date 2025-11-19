from .models import Landlord
from rest_framework import serializers

class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Landlord
        fields = '__all__'