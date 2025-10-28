# Evercentaury Website Setup Guide

## Overview
Your website is ready for deployment with a contact form that needs backend integration for email functionality.

## Files Structure
```
website/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── assets/             # Images folder
│   ├── logos/
│   ├── persons/
│   └── other images...
└── README.md          # This file
```

## Contact Form Integration

### What You Need to Do

1. **Set up a backend endpoint** to handle form submissions
2. **Configure email sending** (SMTP, SendGrid, etc.)
3. **Update the JavaScript** with your endpoint URL

### Step 1: Backend Endpoint Setup

Create an endpoint that accepts POST requests to handle contact forms. The form sends this data:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+356 1234 5678",
  "service": "catering",
  "message": "Hello, I'm interested in your services..."
}
```

### Step 2: Update JavaScript

In `script.js`, find this line (around line 420):
```javascript
const response = await fetch('/api/contact', {
```

Replace `/api/contact` with your actual endpoint URL:
```javascript
const response = await fetch('https://yourdomain.com/api/contact', {
```

### Backend Examples

#### Node.js/Express Example
```javascript
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, service, message } = req.body;
  
  // Send email using your preferred service
  await sendEmail({
    to: 'info@evercentaury.com',
    subject: `New Contact Form: ${service}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  });
  
  res.json({ success: true });
});
```

#### PHP Example
```php
<?php
if ($_POST) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $to = 'info@evercentaury.com';
    $subject = 'New Contact Form: ' . $data['service'];
    $message = "
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> {$data['firstName']} {$data['lastName']}</p>
        <p><strong>Email:</strong> {$data['email']}</p>
        <p><strong>Phone:</strong> {$data['phone']}</p>
        <p><strong>Service:</strong> {$data['service']}</p>
        <p><strong>Message:</strong> {$data['message']}</p>
    ";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: noreply@evercentaury.com\r\n";
    
    mail($to, $subject, $message, $headers);
    
    echo json_encode(['success' => true]);
}
?>
```

### Step 3: Email Service Options

Choose one of these email services:

- **SMTP** (Gmail, Outlook, etc.)
- **SendGrid** (Recommended for transactional emails)
- **Mailgun**
- **AWS SES**
- **Postmark**

### Step 4: Security Considerations

1. **Add CORS headers** if frontend/backend on different domains
2. **Validate and sanitize** all input data
3. **Add rate limiting** to prevent spam
4. **Use HTTPS** for all communications
5. **Add reCAPTCHA** if spam becomes an issue

### Step 5: Testing

1. Test the form with valid data
2. Test validation with invalid data
3. Verify emails are received
4. Test on mobile devices

## Deployment

1. Upload all files to your web server
2. Ensure your backend is running and accessible
3. Update any absolute paths if needed
4. Test the contact form in production

## Support

If you need help with:
- Backend setup
- Email service configuration  
- Domain/hosting setup
- SSL certificate installation

Contact your development team or contact Devory.

## Form Fields Reference

The contact form includes these fields:
- **firstName** (required)
- **lastName** (required)
- **email** (required)
- **phone** (optional)
- **service** (required) - dropdown with options:
  - Hospital & Healthcare Catering
  - Healthcare Professional Staffing
  - Facility Management Services
  - Domiciliary Care Services
  - Education & Training Programs
  - Other Services
- **message** (required)

The form includes client-side validation and shows a success modal when submitted successfully.