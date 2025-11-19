from units.models import Unit
import django_filters
from django.db.models import Q

class UnitFilter(django_filters.FilterSet):
    unit_type = django_filters.CharFilter(field_name='unit_type', lookup_expr='iexact')
    unit_build = django_filters.CharFilter(field_name='unit_build', lookup_expr='iexact')
    unit_status = django_filters.CharFilter(field_name='unit_status', lookup_expr='iexact')
    unit_number = django_filters.CharFilter(field_name='unit_number', lookup_expr='iexact')
    rent_status = django_filters.CharFilter(field_name='payment_unit__rent_status', lookup_expr='iexact')
    search = django_filters.CharFilter(method = 'filter_search')

    class Meta:
        model = Unit
        fields = ['unit_type', 'unit_build', 'unit_status', 'unit_number', 'rent_status']

    @property
    def qs(self):
        rent_qs = super().qs
        return rent_qs.distinct()

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(property__landlord__first_name__icontains = value) | 
            Q(property__landlord__last_name__icontains = value) |
            Q(unit_number__icontains=value)
        )
    