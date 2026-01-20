# Rubble Tech Website

A professional, modern website for Rubble Tech company featuring a showcase of services, company information, and a contact form with email integration.

## Features

✨ **Three Main Pages:**
- **Home Page** - Company introduction, mission, and core values
- **Showcase Page** - Display of services and project categories
- **Contact Page** - Contact form with email integration and company contact info

📱 **Responsive Design**
- Mobile-friendly interface
- Hamburger menu for mobile navigation
- Works seamlessly on desktop, tablet, and phone

🎨 **Modern UI/UX**
- Professional color scheme
- Smooth animations and transitions
- Interactive elements
- Clean typography

📧 **Email Integration**
- Contact form that sends emails to admin
- Automatic confirmation emails to users
- Server-side validation
- Beautiful formatted emails

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Clone or navigate to the project folder:**
   ```bash
   cd RubbleTechWebsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure email settings:**
   - Copy `.env.example` to `.env`
   - Edit `.env` with your email credentials:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-app-password
     ADMIN_EMAIL=info@rubbletech.com
     PORT=3000
     ```

### Getting Gmail App Password (Recommended)

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Find "App passwords" and create one for Mail/Windows
4. Copy the 16-character password to `.env` as `EMAIL_PASSWORD`

### Alternative Email Providers

For other email providers, update these in `.env`:
- **Outlook**: `EMAIL_SERVICE=outlook`
- **Yahoo**: `EMAIL_SERVICE=yahoo`
- **Custom SMTP**: Modify the `nodemailer` transporter in `server.js`

## Running the Website

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The website will be available at 

## File Structure

```
RubbleTechWebsite/
├── index.html          # Main HTML file with all page sections
├── styles.css          # All styling (responsive, mobile-friendly)
├── script.js           # Client-side JavaScript (navigation, form)
├── server.js           # Express server (email handling)
├── package.json        # Project dependencies
├── .env.example        # Environment variables template
├── .env                # Your local email configuration (not in git)
└── README.md           # This file
```

## How It Works

### Navigation
- Click on navigation links to switch between Home, Showcase, and Contact pages
- Smooth scrolling and active link highlighting
- Mobile hamburger menu for smaller screens

### Contact Form
1. User fills out the contact form with name, email, subject, and message
2. Form validates required fields and email format
3. Data is sent to the server (`/api/send-email`)
4. Server sends two emails:
   - **To Admin**: Full contact details for response
   - **To User**: Confirmation that their message was received
5. User sees success/error message

## Customization

### Edit Company Information
In `index.html`, update:
- Company name and description in the hero section
- Phone numbers in the contact section
- Company address and social media links
- Services in the showcase section

### Modify Colors
In `styles.css`, update the `:root` section:
```css
:root {
    --primary-color: #1a73e8;      /* Main blue */
    --secondary-color: #0d47a1;    /* Dark blue */
    --accent-color: #ff6f00;       /* Orange */
    /* ... more colors ... */
}
```

### Add More Services
In `index.html`, duplicate a `.showcase-card` div and update:
- Icon class (Font Awesome)
- Title
- Description
- Features list

## Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku config:set EMAIL_USER=your-email@gmail.com EMAIL_PASSWORD=your-app-password
```

### Deploy to Vercel (Frontend only, requires backend elsewhere)
```bash
npm i -g vercel
vercel
```

### Deploy to your own server
1. Copy files to server
2. Run `npm install`
3. Configure `.env`
4. Start with `npm start` or use a process manager like `pm2`

## Troubleshooting

### Email not sending?
- Verify `.env` file exists and has correct credentials
- Check Gmail allows less secure apps (or use App Password)
- Check server logs for error messages
- Test email connection in server output

### Form shows error?
- Check browser console for error messages
- Verify server is running
- Check network tab in developer tools
- Ensure all required fields are filled

### Mobile menu not working?
- Clear browser cache
- Check browser console for JavaScript errors
- Verify `script.js` is loaded

## Performance Tips

- Images load from Font Awesome CDN
- CSS is minified and optimized
- JavaScript is vanilla (no jQuery needed)
- Server uses compression middleware ready for express middleware

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

ISC

## Contact

For questions about this website, contact Rubble Tech:
- Email: rubble-tech@outlook.com
- Phone: +962 775764398
- Website:

---

**Happy coding! 🚀**
