from rest_framework import serializers

class DashboardSerializer(serializers.Serializer):
    landlord_name = serializers.CharField()
    total_rent = serializers.DecimalField(max_digits=20, decimal_places=2)
    total_units = serializers.IntegerField()
    occupied_units = serializers.IntegerField()
    total_expenses = serializers.DecimalField(max_digits=20, decimal_places=2)
    overdue_invoices = serializers.IntegerField()