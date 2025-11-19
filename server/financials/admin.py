from django.contrib import admin
from .models import Payment,Expenses,Utilities

# Register your models here.
admin.site.register(Payment)
admin.site.register(Expenses)
admin.site.register(Utilities)
