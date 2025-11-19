from rest_framework import serializers
from .models import Payment, Utilities, Expenses
from tenants.serializer import TenantSerializer
from properties.serializer import PropertySerializer
from units.models import Unit
from tenants.models import Tenant
from properties.models import Property

class SimpleUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = ['id', 'unit_number']

class PaymentSerializer(serializers.ModelSerializer):
    tenant = serializers.PrimaryKeyRelatedField(queryset=Tenant.objects.all())
    unit = serializers.PrimaryKeyRelatedField(queryset=Unit.objects.all())
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    tenant_detail = TenantSerializer(source='tenant', read_only=True)
    unit_detail = SimpleUnitSerializer(source='unit', read_only=True)
    property_detail = PropertySerializer(source="property", read_only=True)


    class Meta:
        model = Payment
        fields = '__all__'

class UtilitiesSerializer(serializers.ModelSerializer):
    unit = serializers.PrimaryKeyRelatedField(queryset=Unit.objects.all())
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    unit_detail = SimpleUnitSerializer(source='unit', read_only=True)
    property_detail = PropertySerializer(source="property", read_only=True)
    class Meta:
        model = Utilities
        fields = '__all__'

class ExpensesSerializer(serializers.ModelSerializer):
    unit = serializers.PrimaryKeyRelatedField(queryset=Unit.objects.all())
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())

    unit_detail = SimpleUnitSerializer(source='unit', read_only=True)
    property_detail = PropertySerializer(source="property", read_only=True)
    class Meta:
        model = Expenses
        fields = '__all__'
