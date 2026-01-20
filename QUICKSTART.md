# Rubble Tech Website - Quick Start Guide

## 🚀 Quick Setup (2 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Email
1. Rename `.env.example` to `.env`
2. Add your email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

### Step 3: Run the Server
```bash
npm start
```

### Step 4: Open Website
Visit `http://localhost:3000` in your browser

---

## 📧 Email Setup Instructions

### For Gmail Users (Recommended)
1. Enable 2-Factor Authentication
2. Go to https://myaccount.google.com/apppasswords
3. Create an "App password" for Mail
4. Copy the 16-character password
5. Paste into `.env` as `EMAIL_PASSWORD`

### For Other Email Providers
Update `.env` with:
- **Outlook**: `EMAIL_SERVICE=outlook`
- **Yahoo**: `EMAIL_SERVICE=yahoo`
- **Custom**: Modify `server.js` transporter settings

---

## 🎨 Website Structure

- **Home Page** - Company info, mission, values
- **Showcase Page** - Services and capabilities
- **Contact Page** - Form, phone, email, address

---

## 🔧 Development Commands

```bash
npm start          # Run server
npm run dev        # Run with auto-reload (requires nodemon)
```

---

## 📱 Features

✅ Responsive mobile design
✅ Email form with validation
✅ Automatic confirmation emails
✅ Modern UI with animations
✅ Navigation between pages
✅ Contact information display

---

## 🛠️ Customization

### Change Company Info
Edit `index.html`:
- Update phone numbers
- Change company address
- Modify social media links
- Update service descriptions

### Change Colors
Edit `styles.css` (lines 10-18):
```css
--primary-color: #1a73e8;
--secondary-color: #0d47a1;
--accent-color: #ff6f00;
```

---

## ⚠️ Troubleshooting

**Email not working?**
- Check `.env` file exists
- Verify email credentials
- Check server console for errors

**Website not loading?**
- Make sure port 3000 is available
- Check if server is running
- Try `http://localhost:3000`

**Form submitting but no email?**
- Check browser console for errors
- Verify email service configuration
- Check spam/junk folders

---

## 📖 Full Documentation

See `README.md` for complete documentation.

---

Built with ❤️ for Rubble Tech
