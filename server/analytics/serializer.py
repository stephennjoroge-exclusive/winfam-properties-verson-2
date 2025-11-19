from rest_framework import serializers

class AnalyticsSerializer(serializers.Serializer):
    landlord_name = serializers.CharField()



