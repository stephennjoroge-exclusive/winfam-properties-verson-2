from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Landlord
from landlords.serializer import LandlordSerializer
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .filters import LandlordFilter

# Create your views here.

@api_view(['GET','POST'])
def landlord(request):
    if request.method == 'POST':
        serializer = LandlordSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET': 
        landlord = Landlord.objects.all()
        filter_landlord = LandlordFilter(request.GET, queryset = landlord)
        landlord = filter_landlord.qs
        paginator = PageNumberPagination()
        paginator.page_size = 14
        result_page = paginator.paginate_queryset(landlord, request)
        serializer = LandlordSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

@api_view(['PATCH', 'DELETE'])
def landlord_operations(request, pk):
    try: 
        landlord = Landlord.objects.get(pk=pk)
    except Landlord.DoesNotExist:
        return Response({'error': 'Landlord not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PATCH':
        serializer = LandlordSerializer(landlord, data=request.data, partial = request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        landlord.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
