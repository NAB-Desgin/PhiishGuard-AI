# PhishGuard AI API Documentation

## Overview
PhishGuard AI provides a comprehensive API for phishing detection, user management, and scan history tracking. The API supports both session-based authentication and token-based authentication.

## Base URL
```
http://localhost:5000/api
```

## Authentication
The API supports two authentication methods:

### 1. Session-based Authentication
Use Flask-Login sessions for web-based applications.

### 2. Token-based Authentication
Use Bearer tokens for API clients:
```
Authorization: Bearer token_{user_id}_{timestamp}
```

## Endpoints

### 1. User Authentication

#### POST /api/login
Authenticate a user and receive a token.

**Request Body:**
```json
{
    "username": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "success": true,
    "token": "token_1_1640995200",
    "user": {
        "id": 1,
        "username": "admin",
        "email": "admin@phishguard.ai",
        "is_admin": true
    }
}
```

#### POST /api/register
Register a new user account.

**Request Body:**
```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Registration successful! Please login."
}
```

### 2. Phishing Detection

#### POST /api/scan
Scan a URL for phishing threats.

**Request Body:**
```json
{
    "url": "string"
}
```

**Headers (Optional):**
```
Authorization: Bearer token_{user_id}_{timestamp}
```

**Response:**
```json
{
    "url": "https://example.com",
    "confidence": 0.85,
    "is_phishing": false,
    "risk_level": "Low",
    "confidence_percentage": 85.0,
    "features": {
        "url_length": 25,
        "domain_length": 11,
        "uses_https": 1,
        "has_ip": 0,
        "has_suspicious_tld": 0,
        "has_shortener": 0,
        "suspicious_words": 0
    }
}
```

**Scan Timing:**
- Regular URLs: 5-8 seconds
- Test URLs: 5-6 seconds (additional delay)

### 3. User Profile

#### GET /api/user/profile
Get current user profile information.

**Headers:**
```
Authorization: Bearer token_{user_id}_{timestamp}
```

**Response:**
```json
{
    "user": {
        "id": 1,
        "username": "admin",
        "email": "admin@phishguard.ai",
        "is_admin": true
    }
}
```

## Error Responses

### Authentication Error (401)
```json
{
    "error": "Authentication required"
}
```

### Validation Error (400)
```json
{
    "error": "URL is required"
}
```

### Server Error (500)
```json
{
    "error": "Internal server error message"
}
```

## Rate Limiting
- Default: 100 requests per hour
- Configurable via `API_RATE_LIMIT` environment variable

## Security Features
- HTTPS enforcement (configurable)
- XSS protection headers
- CSRF protection
- Secure session cookies
- Input validation and sanitization

## Database Schema

### Users Table
```sql
CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(120) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    scan_count INTEGER DEFAULT 0
);
```

### Scan History Table
```sql
CREATE TABLE scan_history (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    url VARCHAR(500) NOT NULL,
    is_phishing BOOLEAN NOT NULL,
    confidence_score FLOAT NOT NULL,
    features TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
```

## Usage Examples

### Python Client
```python
import requests
import json

# Login
login_data = {
    "username": "admin",
    "password": "admin123"
}
response = requests.post("http://localhost:5000/api/login", json=login_data)
token = response.json()["token"]

# Scan URL
headers = {"Authorization": f"Bearer {token}"}
scan_data = {"url": "https://example.com"}
response = requests.post("http://localhost:5000/api/scan", json=scan_data, headers=headers)
result = response.json()
print(f"Phishing: {result['is_phishing']}, Confidence: {result['confidence']}")
```

### JavaScript Client
```javascript
// Login
const loginData = {
    username: "admin",
    password: "admin123"
};

fetch("/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
})
.then(response => response.json())
.then(data => {
    const token = data.token;
    
    // Scan URL
    const scanData = { url: "https://example.com" };
    return fetch("/api/scan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(scanData)
    });
})
.then(response => response.json())
.then(result => {
    console.log(`Phishing: ${result.is_phishing}, Confidence: ${result.confidence}`);
});
```

## Testing
Use the provided test URLs for testing:
- Safe URLs: `https://www.google.com/`, `https://www.facebook.com/`
- Phishing URLs: `https://secure-login-google.com/`, `https://amaz0n-support.net`

## Support
For API support and questions, contact the development team or refer to the main application documentation.
