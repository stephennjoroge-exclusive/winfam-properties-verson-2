from django.shortcuts import render
from landlords.models import Landlord
from units.models import Unit
from tenants.models import Tenant
from financials.models import Payment
from financials.models import Expenses
from properties.models import Property

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg, Value, DecimalField
from django.db.models.functions import Coalesce
from .serializer import AnalyticsSerializer

# Create your views here.

@api_view(['GET'])
def analytics(request):
    data = []
    No_of_propeties = Property.objects.count()

    landlords = Landlord.objects.all()
    for landlord in landlords:
        properties = Property.objects.filter(landlord=landlord)
    
    total_rent = Payment.objects.aggregate(
        total = Coalesce(Sum('rent'), Value(0, output_field=DecimalField()))
    )['total']
    total_units = Unit.objects.count()


    occupied_units = Unit.objects.filter(unit_status = 'occupied').count()

    vacant = Unit.objects.filter(unit_status = 'vacant').count()

    tenants_in_each_property = Property.objects.annotate(tenant_count = Count('property_tenants')).values('id','landlord__first_name','tenant_count')
    tenants_in_each_property = list(tenants_in_each_property)



    data.append({
      'No_of_propeties': No_of_propeties,
      'total_rent': total_rent,
      'total_units': total_units,
      'occupied_units': occupied_units,
      'vacant': vacant,
      'tenants_in_each_property':tenants_in_each_property
    })
    return Response(data)


