from django.db import models
from properties.models import Property

# Create your models here.
class Unit(models.Model):
    unit_number = models.CharField(max_length=20)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='units', null=False)
    UNIT_TYPE_CHOICES = [
        ('single', 'Single'),
        ('double_room', 'Double room'),
        ('bedsitter', 'Bedsitter'),
        ('one_bedroom', 'One bedroom'),
        ('two_bedroom', 'Two bedroom'),
    ]
    unit_type = models.CharField(max_length=30, choices=UNIT_TYPE_CHOICES, default='single')
    UNIT_BUILD_CHOICES = [
        ('mabati', 'Mabati'),
        ('block','Block')
    ]
    unit_build = models.CharField(max_length=20, choices=UNIT_BUILD_CHOICES, default='block')
    rent_amount = models.DecimalField(max_digits=20, decimal_places=2)
    UNIT_STATUS_CHOICES =[
        ('vacant', 'Vacant'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance'),
    ]
    unit_status = models.CharField(max_length=20, choices=UNIT_STATUS_CHOICES, default='occupied')

    class Meta:
        ordering = ['-unit_number']

    def __str__(self):
        return f"{self.unit_number}"

