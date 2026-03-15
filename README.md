# Faruk Islam - Full Stack Developer Portfolio

A modern, interactive portfolio website showcasing my work as a full-stack developer specializing in web and mobile applications.

## 🚀 Features

- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Theme**: Automatic theme switching with user preference persistence
- **Interactive Elements**: Smooth animations and micro-interactions
- **Typing Effect**: Dynamic subtitle animation in hero section
- **Particle Background**: Animated particle system for visual appeal
- **Progress Bars**: Animated skill level indicators
- **Project Modals**: Detailed project view with images and descriptions
- **Scroll Animations**: Elements fade in as you scroll
- **Mouse Parallax**: Subtle parallax effects following mouse movement
- **Data-Driven**: Content managed through JavaScript for easy updates
- **Professional Structure**: Organized assets and clean codebase

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables for theming
- **Interactivity**: Vanilla JavaScript with modern APIs
- **Build**: Static site with no dependencies

## 📁 Project Structure

```
farukislamyt.github.io/
├── index.html              # Main HTML file
├── package.json            # Project metadata and scripts
├── README.md               # This file
├── .gitignore             # Git ignore rules
└── assets/
    ├── css/
    │   └── styles.css     # Main stylesheet
    ├── js/
    │   └── main.js        # Main JavaScript file
    └── images/            # Image assets (profile, projects, etc.)
```

## 🏃‍♂️ Getting Started

### Prerequisites

- A modern web browser
- Python 3.x (for local development server)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/farukislamyt/farukislamyt.github.io.git
   cd farukislamyt.github.io
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   python -m http.server 8000
   # or simply open index.html in your browser
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser

## 🎨 Customization

### Content Updates

Edit the `siteData` object in `assets/js/main.js` to update:
- Personal information
- Skills and technologies
- Project details
- Contact information

### Styling

Modify `assets/css/styles.css` to customize:
- Color scheme
- Typography
- Layout and spacing
- Animations

### Adding Images

Place your images in `assets/images/` and update the paths in `main.js`:
- Profile photo
- Project screenshots
- Skill icons

## 🎯 Interactive Features

### Typing Effect
The hero subtitle features a dynamic typing animation that cycles through different developer titles.

### Particle Background
Animated particles create a modern, dynamic background effect in the activity section.

### Skill Progress Bars
Skills are displayed with animated progress bars that fill based on proficiency levels.

### Project Modals
Clicking on project cards opens detailed modal windows with full descriptions, technologies used, and action buttons.

### Scroll Animations
Sections fade in smoothly as they enter the viewport, creating a polished user experience.

### Mouse Parallax
Subtle parallax effects follow mouse movement for enhanced interactivity.

### Animated Counters
Statistics in the about section animate from 0 to their target values.

## ⚡ Performance

The site is optimized for performance with:
- CSS animations using `transform` and `opacity` for smooth 60fps animations
- Intersection Observer API for efficient scroll-based animations
- RequestAnimationFrame for particle animations
- Progressive enhancement - features work without JavaScript
- Reduced motion support for accessibility

## 🚀 Deployment

This site is designed to be deployed on GitHub Pages:

1. Push your changes to the `main` branch
2. Enable GitHub Pages in repository settings
3. Select the `main` branch as source

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a personal portfolio site, but feel free to fork and adapt for your own use!

## 📞 Contact

Faruk Islam
- Email: farukislamyt@gmail.com
- LinkedIn: [linkedin.com/in/farukislamyt](https://www.linkedin.com/in/farukislamyt/)
- GitHub: [github.com/farukislamyt](https://github.com/farukislamyt)

---

Built with ❤️ using HTML, CSS, and JavaScript