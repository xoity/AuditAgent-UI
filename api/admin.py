from django.contrib import admin
from .models import DeviceLogin


@admin.register(DeviceLogin)
class DeviceLoginAdmin(admin.ModelAdmin):
    list_display = ('user_code', 'user', 'is_verified', 'created_at', 'expires_at')
    list_filter = ('is_verified', 'created_at')
    search_fields = ('user_code', 'user__username')
    readonly_fields = ('device_code', 'created_at')

