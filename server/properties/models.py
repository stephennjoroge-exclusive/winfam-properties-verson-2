from django.db import models
from django.contrib.auth.models import User
from landlords.models import Landlord

# Create your models here.
class Property(models.Model):
    landlord = models.ForeignKey(Landlord, on_delete=models.CASCADE, related_name='property_landlord')
    location = models.CharField(max_length=150)
    total_units = models.IntegerField(default=0)
    note = models.TextField(max_length=250, blank=True, null=True)
    # documents = models.FileField(upload_to='property_docs/', blank=True, null=True)

    class Meta:
        ordering = ['-landlord']

    def __str__(self):
        return f"{self.landlord}"