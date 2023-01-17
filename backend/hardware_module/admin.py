from django.contrib import admin
from .models import Image, Temperature, OpenCount

admin.site.register(Image)
admin.site.register(Temperature)
admin.site.register(OpenCount)
