from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import DashboardSerializer
from django.db.models import Sum, Value, DecimalField, Count
from django.db.models.functions import Coalesce
from django.utils import timezone

from landlords.models import Landlord
from properties.models import Property
from units.models import Unit
from tenants.models import Tenant
from financials.models import Payment
from financials.models import Expenses

# Create your views here.

@api_view(['GET'])
def dashboard(request):
    data = []

    total_rent = Payment.objects.aggregate(sum = Sum('rent'))['sum']
    No_of_Landlords = Landlord.objects.count()
    No_of_Tenants = Tenant.objects.count()

    last_month = timezone.now() - timezone.timedelta(days = 31)
    total_monthly_rent  = Payment.objects.filter(date_issued = last_month).aggregate(sum = Sum('rent'))['sum']


    data.append({
        'total_rent' : total_rent,
        'No_of_Landlords':No_of_Landlords,
        'No_of_Tenants': No_of_Tenants,
        'total_monthly_rent': total_monthly_rent
    })

   
    return Response(data)




 # landlords = Landlord.objects.all()
    # for landlord in landlords:
    #     properties = Property.objects.filter(landlord=landlord)

    #     total_rent = Payment.objects.filter(property__in = properties).aggregate(
    #         total = Coalesce(Sum('rent'), Value(0, output_field=DecimalField()))
    #     )['total']
    # total_rent = Payment.objects.aggregate(
    #     total=Coalesce(Sum('rent'), Value(0, output_field=DecimalField()))
    # )['total']

    # total_units = Unit.objects.filter(property__in = properties).count()

    # occupied_units = Unit.objects.filter(property__in = properties, unit_status = 'occupied').count()

    # overdue_units = Unit.objects.filter(property__in = properties, unit_status = 'overdue').count()

    # data.append({
    #     'landlord_name' : f"{landlord.first_name}{landlord.last_name}",
    #     'total_rent': total_rent,
    #     'total_units': total_units,
    #     'occupied_units': occupied_units,
    #     'overdue_units': overdue_units,
    # })
















    # data = []

    # landlords = Landlord.objects.all()
    # for landlord in landlords:
    #     properties = Property.objects.filter(landlord=landlord)

    #     total_rent = Payment.objects.filter(property__in = properties).aggregate (
    #         total = Coalesce(Sum('rent'), Value(0, output_field=DecimalField()))
    #     )['total']

    #     total_units = Unit.objects.filter(property__in = properties).count()

    #     occupied_units = Unit.objects.filter(property__in = properties, unit_status = 'occupied' ).count()



    #     data.append({
    #         'landlord_name' : f"{landlord.first_name}{landlord.last_name}",
    #         'total_rent': total_rent,
    #         'total_units': total_units,
    #         'occupied_units': occupied_units,
    #         # 'total_expenses': total_expenses,
    #         # 'overdue_invoices': overdue_invoices,
    #     })
    # return Response(data)
