# Netlify Deployment Guide

## Quick Start

This website is now configured for deployment on Netlify. Follow these steps:

### 1. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up or log in with your GitHub account
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize Netlify
   - Choose the RubbleTechWebsite repository
   - Click "Deploy"

### 2. **Add Environment Variables**
   After deployment, configure environment variables:
   
   - Go to **Site settings** → **Build & deploy** → **Environment**
   - Click **Edit variables**
   - Add the following variables from the `.env.netlify` file:

   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=info@rubbletech.com
   ```

   **Note:** For Gmail, use an [App Password](https://myaccount.google.com/apppasswords), not your regular password.

### 3. **Trigger a New Deploy**
   - After adding environment variables, go to **Deploys**
   - Click **Trigger deploy** → **Deploy site**
   - Wait for the deploy to complete (usually 1-2 minutes)

## What Changed

The website has been converted from a Node.js/Express server to a Netlify-hosted static site with Netlify Functions:

### Key Changes:
- ✅ `netlify.toml` - Configuration file for Netlify
- ✅ `netlify/functions/send-email.js` - Serverless function replacing the Express server
- ✅ `package.json` - Updated scripts (removed `npm start`, added `netlify dev`)
- ✅ `.env.netlify` - Environment variables reference file
- ℹ️ `server.js` - No longer needed (kept for reference)

### Files Still Used:
- `index.html` - Your main website file
- `styles.css` - All styling
- `script.js` - Client-side functionality (no changes needed)

## Local Development

To test locally before deploying:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Link your local repo to Netlify:**
   ```bash
   netlify link
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   
   This starts a local Netlify development environment at `http://localhost:8888`

4. **Create `.env` for local testing:**
   ```bash
   cp .env.example .env
   # Edit .env with your email credentials
   ```

## Troubleshooting

### Form not sending emails?
1. **Check environment variables** - Verify they're set correctly in Netlify's Site settings
2. **Check logs** - Go to Netlify dashboard → **Functions** → view logs
3. **Gmail issues** - Make sure you're using an [App Password](https://myaccount.google.com/apppasswords), not your regular password
4. **Wait for deploy** - After adding env vars, trigger a new deploy

### Deploy failed?
1. Check the **Deploy logs** on Netlify dashboard
2. Make sure `netlify.toml` exists
3. Make sure `netlify/functions/send-email.js` exists
4. Try redeploying from the dashboard

## Production Checklist

Before going live:
- [ ] Environment variables are set in Netlify
- [ ] Email is configured and tested
- [ ] Custom domain is set up (if applicable)
- [ ] Form submissions are being received
- [ ] Confirmation emails are being sent to users

## Need Help?

- [Netlify Docs](https://docs.netlify.com)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview)
- [Netlify Support](https://support.netlify.com)
