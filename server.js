const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configure email service
// For Gmail: Use an App Password (2FA required)
// For other services: Use your email service credentials
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Test email connection
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('✓ Email service is ready');
    }
});

// API route to send email
app.post('/api/send-email', async (req, res) => {
    const { name, email, phone, company, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        // Email content for Rubble Tech
        const adminEmail = process.env.ADMIN_EMAIL || 'info@rubbletech.com';
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: adminEmail,
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a73e8;">New Contact Form Submission</h2>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
                        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
                        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                    </div>
                    <h3 style="color: #333;">Message:</h3>
                    <p style="white-space: pre-wrap; background-color: #fff; padding: 15px; border-left: 4px solid #1a73e8;">
                        ${escapeHtml(message)}
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #666; font-size: 12px;">
                        This email was sent from your Rubble Tech website contact form.
                    </p>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send confirmation email to user
        const confirmationEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'We received your message - Rubble Tech',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a73e8;">Thank You for Contacting Rubble Tech</h2>
                    <p>Hi ${escapeHtml(name)},</p>
                    <p>We've received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you as soon as possible.</p>
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Your Message Summary:</strong></p>
                        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
                    </div>
                    <p>In the meantime, feel free to reach out to us:</p>
                    <ul>
                        <li>Phone: <strong>+1 (555) 123-4567</strong></li>
                        <li>Email: <strong>info@rubbletech.com</strong></li>
                        <li>Address: 123 Tech Street, Innovation City, IC 12345</li>
                    </ul>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #666; font-size: 12px; text-align: center;">
                        © 2026 Rubble Tech. All rights reserved.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(confirmationEmail);

        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`\n╔════════════════════════════════════════╗`);
    console.log(`║  Rubble Tech Website Server Running   ║`);
    console.log(`║  🌐 http://localhost:${PORT}${PORT === 3000 ? '              ║' : '             ║'}`);
    console.log(`╚════════════════════════════════════════╝\n`);
});

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
