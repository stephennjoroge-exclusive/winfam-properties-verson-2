from rest_framework import serializers
from .models import Unit
from properties.models import Property
from properties.serializer import PropertySerializer


class UnitSerializer(serializers.ModelSerializer):
    property_detail = PropertySerializer(source='property',read_only=True)
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    
    class Meta:
        model = Unit
        fields = '__all__'

    def to_representation(self, instance):
        from financials.models import Payment
        from rest_framework import serializers

        class SimplePaymentSerializer(serializers.ModelSerializer):
            class Meta:
                model = Payment
                fields = ('id', 'rent_status', 'deposit')
        data = super().to_representation(instance)
        data['payment_unit'] = SimplePaymentSerializer(
            instance.payment_unit.all(), many=True
        ).data
        return data




