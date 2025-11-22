from django.db import models
from django.contrib.auth.models import User
import uuid
from django.utils import timezone
import datetime


class DeviceLogin(models.Model):
    """Model to track device authorization flow (like OAuth device code flow)."""
    device_code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user_code = models.CharField(max_length=8, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_verified = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    def is_expired(self):
        return timezone.now() > self.expires_at

    def __str__(self):
        return f"{self.user_code} ({'verified' if self.is_verified else 'pending'})"
    
    class Meta:
        ordering = ['-created_at']
