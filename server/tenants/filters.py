from tenants.models import Tenant
import django_filters

class TenantFilter(django_filters.FilterSet):
    property = django_filters.CharFilter(field_name='unit__property', lookup_expr='icontains')
    unit_status = django_filters.CharFilter(field_name='unit__unit_status', lookup_expr='iexact')
    rent_status = django_filters.CharFilter(field_name='payment_tenant__rent_status', lookup_expr='iexact')
    tenants_per_property = django_filters.CharFilter(field_name = "property__landlord__first_name", lookup_expr = 'icontains')
    class Meta:
        model = Tenant
        fields = ['property', 'rent_status', 'unit_status','tenants_per_property']