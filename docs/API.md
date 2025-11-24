# API Documentation

**Last Updated:** January 2025  
**Base URL:** `/api`

---

## Overview

This application exposes a single API endpoint for handling contact form submissions. The API uses Next.js App Router route handlers and includes server-side reCAPTCHA verification and email sending via Nodemailer.

---

## Endpoints

### 1. GET `/api/contact`

Retrieves the public reCAPTCHA site key for client-side form rendering.

#### Request

```http
GET /api/contact
```

#### Response

**Success (200 OK):**
```json
{
  "recaptchaKey": "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
}
```

#### Example Usage

```typescript
const response = await fetch('/api/contact');
const data = await response.json();
const recaptchaKey = data.recaptchaKey;
```

---

### 2. POST `/api/contact`

Submits a contact form with reCAPTCHA verification and sends an email notification.

#### Request

**Headers:**
```http
Content-Type: application/json
```

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "company": "Acme Corp",
  "siteTitle": "RAM ProMaster EV",
  "captchaToken": "03AGdBq24..."
}
```

#### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstName` | string | Yes | User's first name |
| `lastName` | string | Yes | User's last name |
| `email` | string | Yes | User's email address (must be valid email format) |
| `company` | string | No | User's company name |
| `siteTitle` | string | Yes | Vehicle/site title (e.g., "RAM ProMaster EV") |
| `captchaToken` | string | Yes | Google reCAPTCHA token from client-side verification |

#### Response

**Success (200 OK):**
```json
{
  "message": "Email sent successfully"
}
```

**Error Responses:**

**400 Bad Request - Invalid reCAPTCHA:**
```json
{
  "message": "Invalid captcha"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Error sending email. Please try again later."
}
```

#### Example Usage

```typescript
const formData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  company: "Acme Corp",
  siteTitle: "RAM ProMaster EV",
  captchaToken: recaptchaToken
};

const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});

if (response.ok) {
  const data = await response.json();
  console.log(data.message); // "Email sent successfully"
} else {
  const error = await response.json();
  console.error(error.message);
}
```

---

## Authentication & Security

### reCAPTCHA Verification

All POST requests to `/api/contact` require a valid reCAPTCHA token. The verification process:

1. **Client-side:** User completes reCAPTCHA challenge
2. **Client-side:** Token is obtained from Google reCAPTCHA
3. **Client-side:** Token is sent with form submission
4. **Server-side:** Token is verified with Google's API
5. **Server-side:** If valid, email is sent; if invalid, request is rejected

### Environment Variables Required

The following environment variables must be configured:

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Public reCAPTCHA site key (exposed to client)
- `RECAPTCHA_SECRET_KEY` - Private reCAPTCHA secret key (server-only)
- `EMAIL_USER` - Gmail address for sending emails
- `EMAIL_PASS` - Gmail app password (not regular password)
- `EMAIL_TO` - Recipient email address for contact form submissions

---

## Email Configuration

### SMTP Settings

The API uses Gmail SMTP via Nodemailer:

- **Service:** Gmail
- **Authentication:** Gmail App Password (required)
- **From Address:** "Hero Page"
- **To Address:** Configured via `EMAIL_TO` environment variable

### Email Format

**Subject:**
```
Contact Form from {siteTitle} Hero page
```

**Body (Plain Text):**
```
New contact form submission:
Email: {email}
First Name: {firstName}
Last Name: {lastName}
Company: {company}
Vehicle: {siteTitle}
```

### Gmail App Password Setup

1. Enable 2-Step Verification on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use the generated password (16 characters) as `EMAIL_PASS`

**Important:** Never use your regular Gmail password. App passwords are required for SMTP authentication.

---

## Error Handling

### Error Types

1. **Invalid reCAPTCHA (400)**
   - Token is missing, expired, or invalid
   - User must complete reCAPTCHA again

2. **Email Send Failure (500)**
   - SMTP connection failed
   - Invalid email credentials
   - Network issues
   - Gmail rate limiting

3. **Server Error (500)**
   - Unexpected errors
   - Error details logged in development mode only

### Error Logging

- **Development:** Full error details logged to console
- **Production:** Generic error messages only (no sensitive data exposed)

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting for production use:

- Per IP address
- Per email address
- Per reCAPTCHA token

---

## Testing

### Manual Testing

1. **Test Valid Submission:**
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User",
       "email": "test@example.com",
       "company": "Test Company",
       "siteTitle": "RAM ProMaster EV",
       "captchaToken": "valid_token_here"
     }'
   ```

2. **Test Invalid reCAPTCHA:**
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User",
       "email": "test@example.com",
       "siteTitle": "RAM ProMaster EV",
       "captchaToken": "invalid_token"
     }'
   ```

### Integration Testing

See [`docs/TESTING.md`](./TESTING.md) for automated testing examples.

---

## Security Considerations

### Best Practices

1. ✅ **Server-side reCAPTCHA verification** - Never trust client-side only
2. ✅ **Environment variables** - Secrets stored securely
3. ✅ **Error handling** - No sensitive data exposed in production
4. ✅ **Input validation** - Email format validation (via reCAPTCHA)
5. ⚠️ **Rate limiting** - Not implemented (recommended for production)

### Recommendations

1. **Add rate limiting** to prevent abuse
2. **Add input validation** for email format and field lengths
3. **Add request logging** for monitoring and debugging
4. **Consider using** a dedicated email service (SendGrid, Mailgun) instead of Gmail SMTP
5. **Add monitoring** and alerting for failed email sends

---

## Monitoring & Debugging

### Development Mode

- Full error stack traces logged to console
- reCAPTCHA verification details logged
- Email send status logged

### Production Mode

- Generic error messages only
- No sensitive data in responses
- Errors logged server-side (check deployment platform logs)

### Debugging Tips

1. **Check environment variables** are set correctly
2. **Verify reCAPTCHA keys** are valid and match
3. **Test Gmail credentials** independently
4. **Check deployment platform logs** for server errors
5. **Verify network connectivity** to Google's reCAPTCHA API

---

## Related Documentation

- [`README.md`](../README.md) - Main project documentation
- [`VERCEL_DEPLOYMENT.md`](../VERCEL_DEPLOYMENT.md) - Deployment guide
- [`docs/TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) - Troubleshooting guide
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Official Next.js documentation
- [Nodemailer Documentation](https://nodemailer.com/about/) - Email sending library
- [Google reCAPTCHA](https://developers.google.com/recaptcha) - reCAPTCHA documentation

---

## Changelog

### Version 1.3.0 (January 2025)
- ✅ Added production-safe error handling
- ✅ Improved error messages
- ✅ Added NODE_ENV checks for logging

### Version 1.1.0 (December 2024)
- ✅ Initial API implementation
- ✅ reCAPTCHA integration
- ✅ Email sending via Nodemailer

---

**Last Updated:** January 2025  
**API Version:** 1.3.0

