from ninja import NinjaAPI, Schema
from django.shortcuts import get_object_or_404
from .models import DeviceLogin
from django.utils import timezone
import datetime
import random
import string
from django.contrib.auth.models import User
from ninja.security import django_auth

api = NinjaAPI()


class DeviceCodeResponse(Schema):
    device_code: str
    user_code: str
    verification_uri: str
    expires_in: int
    interval: int


@api.post("/device/code", response=DeviceCodeResponse)
def create_device_code(request):
    """Generate a device code for CLI authentication."""
    # Generate a random 8-char user code
    user_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    # Ensure uniqueness
    while DeviceLogin.objects.filter(user_code=user_code).exists():
        user_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    expires_in = 300  # 5 minutes
    expires_at = timezone.now() + datetime.timedelta(seconds=expires_in)
    
    device_login = DeviceLogin.objects.create(
        user_code=user_code,
        expires_at=expires_at
    )
    
    # Format user code with hyphen for readability
    formatted_code = f"{user_code[:4]}-{user_code[4:]}"
    
    return {
        "device_code": str(device_login.device_code),
        "user_code": formatted_code,
        "verification_uri": f"{request.scheme}://{request.get_host()}/device/activate",
        "expires_in": expires_in,
        "interval": 5
    }


class TokenResponse(Schema):
    access_token: str
    token_type: str


class TokenRequest(Schema):
    device_code: str


@api.post("/device/token")
def get_device_token(request, payload: TokenRequest):
    """Poll endpoint for CLI to check if device has been authorized."""
    try:
        device_login = DeviceLogin.objects.get(device_code=payload.device_code)
    except DeviceLogin.DoesNotExist:
        return api.create_response(request, {"error": "invalid_request"}, status=400)
    
    if device_login.is_expired():
        return api.create_response(request, {"error": "expired_token"}, status=400)
        
    if not device_login.is_verified:
        return api.create_response(request, {"error": "authorization_pending"}, status=400)
        
    # Return token
    return {
        "access_token": f"auditagent_token_{device_login.user.id}_{device_login.device_code}",
        "token_type": "bearer"
    }


class VerifyRequest(Schema):
    user_code: str


@api.post("/device/verify", auth=django_auth)
def verify_device_code(request, payload: VerifyRequest):
    """Verify the user code and link it to the authenticated user."""
    # Strip hyphens and whitespace
    code = payload.user_code.replace("-", "").replace(" ", "").upper()
    
    try:
        device_login = DeviceLogin.objects.get(user_code=code)
    except DeviceLogin.DoesNotExist:
        return api.create_response(request, {"error": "invalid_code"}, status=400)
    
    if device_login.is_expired():
        return api.create_response(request, {"error": "expired_code"}, status=400)
    
    device_login.is_verified = True
    device_login.user = request.user
    device_login.save()
    
    return {"success": True, "message": "Device successfully authorized!"}
