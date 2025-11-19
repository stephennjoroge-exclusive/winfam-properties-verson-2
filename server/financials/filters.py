from financials.models import Payment
import django_filters
from django.db.models import Q

class PaymentFilter(django_filters.FilterSet):
    payment_method = django_filters.CharFilter(field_name='payment_method', lookup_expr='iexact')
    unit_status = django_filters.CharFilter(field_name='unit__unit_status', lookup_expr='iexact')
    rent_status = django_filters.CharFilter(field_name='rent_status', lookup_expr='iexact')
    search = django_filters.CharFilter(method = 'filter_search')

    class Meta:
        model = Payment
        fields = '__all__'

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(property__landlord__first_name__icontains=value) | 
            Q(property__landlord__last_name__icontains=value) | 
            Q(unit__unit_number__icontains=value) |
            Q(tenant__first_name__icontains = value) |
            Q(tenant__last_name__icontains = value) 
        )



        

    