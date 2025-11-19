from rest_framework import serializers
from .models import Property
from landlords.serializer import LandlordSerializer
from landlords.models import Landlord
from financials.models import Payment

class SimplePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'deposit', 'rent_status', 'rent', 'date_issued']

class PropertySerializer(serializers.ModelSerializer):
    landlord = serializers.PrimaryKeyRelatedField(queryset=Landlord.objects.all())
    landlord_detail = LandlordSerializer(source='landlord', read_only=True)

    payment_property = SimplePaymentSerializer(many=True, read_only=True)
    class Meta:
        model = Property
        fields = '__all__'