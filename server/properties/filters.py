from properties.models import Property
import django_filters
from django.db.models import Q


class PropertyFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method = 'filter_search')

    class Meta:
        model = Property
        fields = '__all__'

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(landlord__first_name__icontains = value) | 
            Q(landlord__last_name__icontains = value) |
            Q(location__icontains = value)
        )
