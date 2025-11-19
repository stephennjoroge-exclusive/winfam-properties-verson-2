from rest_framework import serializers
from .models import Tenant
from units.serializer import UnitSerializer
from properties.serializer import PropertySerializer
from units.models import Unit
from properties.models import Property


class TenantSerializer(serializers.ModelSerializer):
    property_detail = PropertySerializer(source="property", read_only=True)
    unit_detail = UnitSerializer(source="unit", read_only=True)
    
    property = serializers.PrimaryKeyRelatedField(queryset = Property.objects.all())
    unit = serializers.PrimaryKeyRelatedField(queryset = Unit.objects.all())
    class Meta:
        model = Tenant
        fields = '__all__'

    def to_representation(self, instance):
        from rest_framework import serializers
        from financials.models import Payment

        class SimplePaymentSerializer(serializers.ModelSerializer):
            class Meta:
                model = Payment
                fields = ('id', 'rent_status')
        data =  super().to_representation(instance)
        unit = instance.unit
        payments = unit.payment_unit.all()
        data['payment_unit'] = SimplePaymentSerializer(payments, many=True).data
        return data




