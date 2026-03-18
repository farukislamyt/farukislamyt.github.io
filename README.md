# Faruk Islam - Portfolio Website

A modern, responsive portfolio website for showcasing full-stack development work.

## ✨ Features

- ✅ Clean, modern design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark mode by default
- ✅ Smooth navigation between sections
- ✅ Contact form
- ✅ Service Worker for offline support
- ✅ **No external dependencies** - pure HTML, CSS, JS
- ✅ **Works immediately** - just open `index.html`

## 🚀 Getting Started

### Quick Start (No Setup Required)

1. **Just open the file**: Double-click `index.html`
   - Website opens immediately in your browser
   - No server needed, no installation required
   - Everything works offline

### With a Local Server (Optional)

```bash
# Using Python 3
python -m http.server 8000
# Open http://localhost:8000
```

## 📁 Project Structure

```
├── index.html          # Everything: HTML, CSS, JavaScript
├── manifest.json       # PWA configuration
├── sw.js               # Service Worker
├── package.json        # Project metadata
└── README.md           # This file
```

## 💡 How It Works

**Zero dependencies** - This is a static website that:
- Has no build step
- Needs no npm install
- Requires no external libraries
- Works in any modern browser

Everything is self-contained in a single `index.html` file.

## ✏️ Customize Your Portfolio

### Edit Content
Open `index.html` with any text editor and update:
- Your name and headline
- About section
- Skills list
- Projects showcase
- Contact information

### Change Colors
In the `<style>` section, modify these CSS variables:
```css
--primary: #3b82f6;        /* Main color (blue) */
--bg: #0f172a;             /* Background */
--text: #f1f5f9;           /* Text color */
```

### Add Your Information
Replace placeholder text in each section:
- Hero section: Your title and tagline
- Projects: Your actual projects
- Skills: Your technologies
- Contact: Your email and social links

## 🌐 Deploy to GitHub Pages

```bash
# 1. Commit and push
git add .
git commit -m "Update portfolio"
git push origin main

# 2. Enable Pages in GitHub Settings
# Your site is now live at https://yourusername.github.io
```

### Other Hosting
Upload files to:
- Netlify
- Vercel
- Firebase Hosting
- Any web server

## 🎯 Features Explained

### Navigation
- Click links in header to jump between sections
- Smooth scrolling
- Works on mobile

### Contact Form
- Basic form with validation
- Currently shows confirmation message
- For email functionality, use:
  - Formspree
  - EmailJS
  - Backend API

### Offline Support
- Service Worker automatically caches pages
- Website works without internet
- No setup needed

### Mobile Responsive
- Works on phones, tablets, desktops
- Touch-friendly buttons
- Optimized layout for all screen sizes

## 🌍 Browser Support

Works in:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile Chrome/Safari
- ✅ All modern browsers

## 🐛 Troubleshooting

**Website won't open?**
- Double-click `index.html` directly
- Make sure JavaScript is enabled

**Styles look weird?**
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser

**Form not sending?**
- Currently just shows confirmation
- Use Formspree (free) for real emails

## 📊 Performance

- **Load time**: < 1 second
- **Offline**: ✅ Works
- **Mobile**: ✅ Optimized
- **Size**: Very small

## 📝 License

MIT - Use this template for your portfolio

---

**Ready to use - just customize and deploy! 🎉**
