from django.db import models
from tenants.models import Tenant
from units.models import Unit

# def agreement_file_path(instance, filename):
#     return f"tenant_agreements/tenant_{instance.tenant.id}/{filename}"

class TenantAgreement(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='tenant_agreements')
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='unit_agreements')
    
    start_date = models.DateField()
    end_date = models.DateField()
    monthly_rent = models.DecimalField(max_digits=20, decimal_places=2)
    deposit_amount = models.DecimalField(max_digits=20, decimal_places=2)
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('ended', 'Ended'),
        ('pending', 'Pending'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    
    # contract_file = models.FileField(upload_to=agreement_file_path, blank=True, null=True)

    class Meta:
        ordering = ['tenant']

    def __str__(self):
        return f"{self.tenant.first_name} {self.tenant.last_name} - {self.unit.unit_number}"
