from django.contrib import admin
from .models import Image, Temperature, OpenCount
from django.contrib.admin import ModelAdmin


class CustomOpenCountAdmin(ModelAdmin):
    fields = [
        "user",
        "count",
        "created_at",
        "updated_at",
    ]
    readonly_fields = ["created_at", "updated_at"]


admin.site.register(Image)
admin.site.register(Temperature)
admin.site.register(OpenCount, CustomOpenCountAdmin)
