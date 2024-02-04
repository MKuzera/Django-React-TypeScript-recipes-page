from django.contrib import admin
from .models import Przepis, Kategoria

# Register your models here.
admin.site.register(Przepis)
admin.site.register(Kategoria)