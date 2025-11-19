from django.db import models
from properties.models import Property
from units.models import Unit

# Create your models here.
class Tenant(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30, null=True, blank=True, default='')
    id_number = models.IntegerField()
    phone = models.IntegerField()
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_tenants')
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='unit_tenants')
    move_in_date = models.DateField(blank=True, null=True)
    
    
    # profile_scan = models.ImageField()

    class Meta:
        ordering = ['-first_name']

    def __str__(self):
        return f"{self.first_name}"

