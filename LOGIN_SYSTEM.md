# AuditAgent Login System

Complete implementation of the semgrep-style device authorization flow for AuditAgent.

## 🎯 Overview

The login system allows the AuditAgent CLI to authenticate with the AuditAgent Web UI using a device authorization flow (similar to how Semgrep, GitHub CLI, and other tools work).

## 🔐 How It Works

1. **User runs `auditagent login` in terminal**
2. **CLI requests a device code from the API**
3. **CLI displays a URL and user code**
4. **User opens the URL in browser and enters the code**
5. **User logs in (if not already logged in)**
6. **CLI polls the API and receives an access token**
7. **Token is saved locally for future use**

## 📦 Components

### Backend (Django + Django Ninja)

- **Model**: `DeviceLogin` - Stores device codes, user codes, and verification status
- **API Endpoints**:
  - `POST /api/device/code` - Generate a device code
  - `POST /api/device/token` - Poll for token (CLI)
  - `POST /api/device/verify` - Verify user code (Browser)

### CLI Commands (Typer)

- `auditagent login` - Start the authentication flow
- `auditagent logout` - Clear stored token
- `auditagent whoami` - Check authentication status

### Token Storage

- Tokens are stored in `~/.auditagent/config.json`
- File permissions are set to `0600` (owner read/write only)

## 🚀 Testing the Flow

### 1. Start the Backend

```bash
cd AuditAgent-UI
source .venv/bin/activate
python manage.py runserver
```

### 2. Create a Superuser (if you haven't)

```bash
python manage.py createsuperuser
```

### 3. Install the CLI

```bash
cd ../AuditAgent
pip install -e .
```

### 4. Run the Login Flow

```bash
auditagent login
```

You should see:
```
🔐 AuditAgent Login

Requesting authentication code...

To authenticate:
  1. Open this URL in your browser: http://localhost:8000/device/activate
  2. Enter this code: ABCD-EFGH

Waiting for you to complete authentication...
```

### 5. Complete in Browser

1. Open `http://localhost:8000/device/activate`
2. Log in with your superuser credentials
3. Enter the code displayed in the terminal
4. Click "Verify"

### 6. CLI Receives Token

```
✓ Authentication successful!
Token saved to /home/user/.auditagent/config.json

You can now use AuditAgent CLI with the UI.
```

## 🔧 API Reference

### Device Code Flow

**Request Device Code**
```bash
curl -X POST http://localhost:8000/api/device/code
```

Response:
```json
{
  "device_code": "uuid-here",
  "user_code": "ABCD-EFGH",
  "verification_uri": "http://localhost:8000/device/activate",
  "expires_in": 300,
  "interval": 5
}
```

**Poll for Token**
```bash
curl -X POST http://localhost:8000/api/device/token \
  -H "Content-Type: application/json" \
  -d '{"device_code": "uuid-here"}'
```

Responses:
- `200 OK`: Token granted
- `400 Bad Request` with `"error": "authorization_pending"`: Keep polling
- `400 Bad Request` with `"error": "expired_token"`: Code expired
- `400 Bad Request` with `"error": "invalid_request"`: Invalid device code

**Verify Code (Browser)**
```bash
curl -X POST http://localhost:8000/api/device/verify \
  -H "Content-Type: application/json" \
  -H "Cookie: sessionid=..." \
  -d '{"user_code": "ABCDEFGH"}'
```

## 📝 Next Steps

- [ ] Add frontend UI components (Dashboard, DeviceActivate page)
- [ ] Implement token-based API authentication
- [ ] Add endpoints for audit/policy operations
- [ ] Sync CLI audit results with Web UI
- [ ] Add webhook support for real-time updates

## 🔒 Security Notes

- Tokens are stored with restricted file permissions (`0600`)
- Device codes expire after 5 minutes
- User must be authenticated to verify a device code
- CSRF protection is enabled for all POST requests
