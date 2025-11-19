from .models import Landlord
import django_filters
from django.db.models import Q

class LandlordFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method = 'filter_search')

    class Meta:
        model = Landlord
        fields = '__all__'

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(first_name__icontains = value) |
            Q(last_name__icontains = value)
        )