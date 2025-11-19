from django.db import models
from agreements.models import TenantAgreement
from tenants.models import Tenant
from units.models import Unit
from properties.models import Property
from django.utils import timezone

# Create your models here.
class Payment(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, null=True, related_name='payment_tenant')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='payment_property',null=True)
    unit = models.ForeignKey(Unit, on_delete=models.SET_NULL, null=True, related_name='payment_unit')
    rent_payable = models.DecimalField(max_digits=20, decimal_places=2)
    rent = models.DecimalField(max_digits=20, decimal_places=2)
    PAYMENT_METHOD_CHOICES = [
        ("mpesa", "Mpesa"),
        ("equity", "Equity"),
        ("cash", "Cash"),
    ]
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='mpesa')
    RENT_STATUS = [
        ('paid', 'Paid'),
        ('overdue','Overdue'),
        ('vacant','Vacant'),
    ]
    rent_status = models.CharField(max_length=50, choices=RENT_STATUS, default='')
    balance_brought_forward = models.DecimalField(max_digits=20, decimal_places=2, default=0, blank=True, null=True) 
    balance_carry_forward = models.DecimalField(max_digits=20, decimal_places=2, default=0, blank=True, null=True)
    deposit = models.DecimalField(max_digits=8, decimal_places=2, null=True, default=0, blank=True)
    date_issued = models.DateField(null=True)

    class Meta:
        ordering = ['-date_issued']
    
    def __str__(self):
        return f"{self.tenant} - {self.rent}"

class Expenses(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_expense')
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='unit_expense', null=True, blank=True)
    expense_name = models.CharField(max_length=50)
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(max_length=255)
    date = models.DateField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.expense_name

class Utilities(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="utilities_property", null=True)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name="utilities_unit", null=True)
    item = models.CharField(max_length=100)
    previous_reading = models.CharField(max_length=100)
    current_reading = models.CharField(max_length=100)
    date = models.DateField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.item}"