const nodemailer = require('nodemailer');

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

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { name, email, phone, company, subject, message } = JSON.parse(event.body);

        // Validation
        if (!name || !email || !subject || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid email address' })
            };
        }

        // Configure email service
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const adminEmail = process.env.ADMIN_EMAIL || 'info@rubbletech.com';

        // Email to admin
        const adminMailOptions = {
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

        // Send email to admin
        await transporter.sendMail(adminMailOptions);

        // Confirmation email to user
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

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Email sent successfully' })
        };

    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email. Please try again later.' })
        };
    }
};
