from django.contrib import admin
from .models import CustomUser, UserNotification
from django.contrib.admin import ModelAdmin


class CustomUserAdmin(ModelAdmin):
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "password",
                    "email",
                    "groups",
                    "is_superuser",
                    "is_staff",
                    "mobile_number",
                    "last_login",
                    "fcm_token",
                )
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "password1",
                    "password2",
                    "email",
                    "groups",
                    "is_superuser",
                    "is_staff",
                    "mobile_number",
                    "last_login",
                )
            },
        ),
    )
    read_only_fields = ("password", "uuid")
    list_display = ("email", "is_superuser")
    list_filter = ("email", "groups")


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserNotification)
