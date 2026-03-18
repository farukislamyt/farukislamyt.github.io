# Faruk Islam — Portfolio Website

A professional dark-themed portfolio website for a Full Stack Developer.

## 📁 File Structure

```
faruk-portfolio/
├── index.html          ← Main HTML file
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All JavaScript
├── assets/             ← Put your CV PDF here as "faruk-islam-cv.pdf"
└── README.md
```

## 🚀 How to Use

1. Open `index.html` in any browser — no build step needed.
2. To deploy: upload all files to Netlify, Vercel, or GitHub Pages.

## ✏️ What to Customize

### Personal Info (`index.html`)
- Replace `faruk@email.com` with your real email
- Replace `github.com/farukislam` and `linkedin.com/in/farukislam` with your real URLs
- Update hero bio text, years of experience, project count
- Update project names, descriptions, tech stacks
- Update work history (companies, roles, years, descriptions)

### CV Download
- Add your CV as `assets/faruk-islam-cv.pdf`

### Skill Percentages (`index.html`)
- Edit `style="--w:95%"` values on each `.bar-fill` element

### Contact Form
- In `js/main.js`, replace the `setTimeout` simulation in `initContactForm()`
  with a real API call (e.g. EmailJS, Formspree, or your own backend)

## 🎨 Features
- Custom animated cursor
- Scroll-triggered reveal animations
- Animated skill bars
- Typing effect in hero section
- Counter animation on stats
- Subtle tilt effect on cards
- Mobile responsive with hamburger menu
- Sticky navbar with blur on scroll
- Contact form with success state
- Back-to-top button
- Custom scrollbar

## 🌐 Deploy to Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop the `faruk-portfolio` folder
3. Done! Your site is live.

## 📄 License
Free to use and customize for personal use.
