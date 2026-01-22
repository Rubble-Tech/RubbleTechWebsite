# NETLIFY ENVIRONMENT VARIABLES

## Instructions: Add these to Netlify Dashboard

1. Go to your Netlify site dashboard
2. Click: **Site settings** → **Build & deploy** → **Environment**
3. Click **Edit variables**
4. Add each variable below by clicking **New variable**

---

## Variables to Add

| Variable | Value |
|----------|-------|
| `EMAIL_SERVICE` | `gmail` |
| `EMAIL_USER` | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | `your-app-password` |
| `ADMIN_EMAIL` | `info@rubbletech.com` |

---

## Getting Your Credentials

### For Gmail:
1. You need a Gmail account with 2-Factor Authentication enabled
2. Go to: https://myaccount.google.com/apppasswords
3. Generate a new app password for "Mail" → "Windows"
4. Copy the 16-character password (without spaces)
5. Use that as `EMAIL_PASSWORD` in Netlify

### For Other Email Providers:
- **Outlook**: Change `EMAIL_SERVICE` to `outlook`
- **Yahoo**: Change `EMAIL_SERVICE` to `yahoo`
- Update `EMAIL_USER` with your email address
- Update `EMAIL_PASSWORD` with your app password

---

## Final Steps

1. ✅ All environment variables added to Netlify
2. ✅ Go to **Deploys** tab
3. ✅ Click **Trigger deploy** → **Deploy site**
4. ✅ Wait for deployment to complete
5. ✅ Test the contact form on your live site

Your website is now ready for Netlify deployment!
