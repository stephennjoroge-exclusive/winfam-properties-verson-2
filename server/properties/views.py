from django.shortcuts import render
from properties.serializer import PropertySerializer
from .models import Property
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

# Create your views here.

@api_view(['GET', 'POST'])
def property_list(request):
    if request.method == 'GET':
        property = Property.objects.all()
        paginator = PageNumberPagination()
        paginator.page_size = 10
        results_page = paginator.paginate_queryset(property, request)
        serializer = PropertySerializer(results_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = PropertySerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', 'PATCH'])
def property_operations(request, pk):
    try:
        property= Property.objects.get(pk=pk)
    except Property.DoesNotExist:
        return Response({'error': 'Property not found'},status= status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PATCH':
        serializer = PropertySerializer(property, data=request.data, partial = request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        property.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)