from django.shortcuts import render,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from tenants.serializer import TenantSerializer
from .models import Tenant
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .filters import TenantFilter
from financials.models import Payment
from units.models import Unit
from django.db.models import Count, Sum, Avg, Value, DecimalField
from django.db.models.functions import Coalesce
from tenants.filters import TenantFilter
import openpyxl

# Create your views here.

@api_view(['GET', 'POST'])
def tenants_list(request):
    if request.method == 'GET':
        tenants = Tenant.objects.all()
        filter_tenants = TenantFilter(request.GET, queryset=tenants)
        tenants = filter_tenants.qs
        paginator = PageNumberPagination()
        paginator.page_size = 15
        result_page = paginator.paginate_queryset(tenants, request)
        serializer = TenantSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TenantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE','PATCH'])
def tenants_operations(request, pk):
    try:
        tenant = Tenant.objects.get(pk=pk)
    except Tenant.DoesNotExist:
        return Response ({'error':'Tenant not found'}, status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PATCH':
        serializer = TenantSerializer(tenant, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tenant.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    

@api_view(['GET'])
def tenants_stats(request, pk):
    data = []

    try:
        tenant = Tenant.objects.get(pk=pk)
    except Tenant.DoesNotExist:
        return Response({'error': 'Tenant not found'}, status=status.HTTP_404_NOT_FOUND)
    

    tenant_name = tenant.first_name

    overdue = tenant.payment_tenant.filter(rent_status = 'overdue').count()
    total_rent_paid = tenant.payment_tenant.aggregate(sum = Sum('rent'))['sum']
    total_payments = tenant.payment_tenant.count()
    

    data.append({
        'tenant_name': tenant_name, 
        "total_payments": total_payments,
        "total_rent_paid": total_rent_paid,
        "overdue": overdue,
        
        # "on_time": on_time,
        
        # "on_time_rate": round((on_time / total_count) * 100, 1) if total_count else 0,
        # "outstanding_balance": 5000,
        # "missed_months": 0,
    })

    return Response(data)

def export_tenants(request):
    filtered_tenants = TenantFilter(request.GET, queryset=Tenant.objects.all()).qs
    workbook = openpyxl.Workbook()
    sheet = workbook.active
    sheet.title = 'Tenants'

    headers = [
        'Property',
        'Unit',
        'First Name',
        'Last Name',
        'ID Number',
        'Phone',
        'Move in Date',
        'Unit Status',
        'Rent Status'
    ]

    sheet.append(headers)

    for item in filtered_tenants:
        sheet.append([
           f"{item.property.landlord.first_name} {item.property.landlord.last_name}" if item.property and item.property.landlord else "",
           f"{item.unit.unit_number}",
           item.first_name,
           item.last_name,
           item.id_number,
           item.phone,
           item. move_in_date,
           item.unit.unit_status,
        #    item.payment_tenant.rent_starent_statustus,
  
        ])

    response = HttpResponse(
    content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response['Content-Disposition'] = 'attachment; filename=tenants.xlsx'

    workbook.save(response)
    return response



