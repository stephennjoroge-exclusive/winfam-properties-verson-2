from django.db import models

# Create your models here.

class Landlord(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)

    class Meta:
        ordering = ['-first_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
