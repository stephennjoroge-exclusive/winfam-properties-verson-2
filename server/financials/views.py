from django.shortcuts import render
from financials.serializer import PaymentSerializer, UtilitiesSerializer, ExpensesSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Expenses, Payment, Utilities
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from financials.filters import PaymentFilter

# Create your views here.

@api_view(['GET', 'POST'])
def payments(request):
    if request.method == 'GET':
        payment = Payment.objects.all()
        filter_payment = PaymentFilter(request.GET, queryset = payment)
        payment = filter_payment.qs
        paginator = PageNumberPagination()
        paginator.page_size = 15
        result_page = paginator.paginate_queryset(payment, request)
        serializer = PaymentSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = PaymentSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'PATCH', 'DELETE'])
def payment_operations(request, pk):
    try:
        payment = Payment.objects.get(pk=pk)
    except Payment.DoesNotExist:
        return Response ({'error': "Payment not found"}, status = status.HTTP_404_NOT_FOUND)
    
    if request.method in ['PUT', 'PATCH']:
        serializer = PaymentSerializer(payment, data=request.data, partial = request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        payment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def expenses(request):
    if request.method == 'GET':
        expenses = Expenses.objects.all()
        paginator = PageNumberPagination()
        paginator.page_size = 10
        results_page = paginator.paginate_queryset(expenses, request)
        serializer = ExpensesSerializer(results_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = ExpensesSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'PATCH', 'DELETE'])
def expenses_operations(request, pk):
    try:
        expenses = Expenses.objects.get(pk=pk)
    except Expenses.DoesNotExist:
        return Response ({'error': "Expenses not found"}, status = status.HTTP_404_NOT_FOUND)
    
    if request.method in ['PUT', 'PATCH']:
        serializer = ExpensesSerializer(expenses, data=request.data, partial = request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        expenses.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def utilities(request):
    if request.method == 'GET':
        utilities = Utilities.objects.all()
        paginator = PageNumberPagination()
        paginator.page_size = 10
        result_page = paginator.paginate_queryset(utilities, request)
        serializer = UtilitiesSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UtilitiesSerializer(data = request.data )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PATCH','DELETE'])
def utilities_operations(request, pk):
    try:
        utilities = Utilities.objects.get(pk=pk)
    except Utilities.DoesNotExist:
        return Response({'error':'Utilities not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PATCH':
        serializer = UtilitiesSerializer(Utilities, data=request.data, partial = request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        utilities.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# def export_payments(request):
#     filtered_payments = PaymentFilter(request.GET, queryset=Payment.objects.all()).qs
#     workbook = openpyxl.Workbook()
#     sheet = workbook.active
#     sheet.title = 'Payments'

#     headers = [
#         'Tenant',
#         'Property',
#         'Unit',
#         'Rent Payable',
#         'Rent',
#         'Payment Method',
#         'Rent Status',
#         'Balance (B/F)',
#         'Balance (C/f)',
#         'Unit Status',
#         'Rent Status',
#         'Date'
#     ]

#     sheet.append(headers)

#     for item in filtered_payments:
#         item.tenant


