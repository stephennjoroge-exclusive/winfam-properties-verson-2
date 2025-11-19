from django.shortcuts import render
from django.http import HttpResponse
from units.serializer import UnitSerializer
from .models import Unit
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .filters import UnitFilter
import openpyxl

# Create your views here.


@api_view(['GET', 'POST'])
def unit_list(request):
    if request.method == 'GET':
        property_id = request.GET.get('property_id')
        if property_id:
            unit = Unit.objects.filter(property_id = property_id)
        else:
            unit = Unit.objects.all()

        filter_units = UnitFilter(request.GET, queryset=unit)
        unit = filter_units.qs
        paginator = PageNumberPagination()
        paginator.page_size = 13
        result_page = paginator.paginate_queryset(unit, request)
        serializer = UnitSerializer(result_page,many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = UnitSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PATCH', 'DELETE'])
def unit_operations(request, pk):
    try:
        unit = Unit.objects.get(pk = pk)
    except Unit.DoesNotExist:
        return Response ({'error': 'Unit not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PATCH':
        serializer = UnitSerializer(unit, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        unit.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    
def export_units(request):
    filtered_units = UnitFilter(request.GET, queryset=Unit.objects.all()).qs
    workbook = openpyxl.Workbook()
    sheet = workbook.active
    sheet.title = 'Units'

    headers = [
        'Unit Number',
        'Property',
        'Unit Type',
        'Unit Build',
        'Rent Amount',
        'Unit Status',
    ]
    sheet.append(headers)

    for item in filtered_units:
        sheet.append([
            item.unit_number,
            f"{item.property.landlord.first_name} {item.property.landlord.last_name}" if item.property and item.property.landlord else "",
            item.unit_type,
            item.unit_build,
            item.rent_amount,
            item.unit_status,
        ])

    response = HttpResponse(
    content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response['Content-Disposition'] = 'attachment; filename=units.xlsx'

    workbook.save(response)
    return response
