/*
  Dynamic portfolio renderer
  - Uses a simple data model (siteData) to populate the template
  - Includes interactive animations and effects
  - Uses IntersectionObserver for a professional nav highlight experience
*/

const dom = {
  logo: document.getElementById("logo"),
  nav: document.getElementById("nav"),
  navToggle: document.getElementById("navToggle"),
  navLinks: document.querySelectorAll(".nav__link"),
  scrollTopBtn: document.getElementById("scrollTop"),
  year: document.getElementById("year"),
  footerName: document.getElementById("footerName"),
  hero: {
    preface: document.getElementById("heroPreface"),
    title: document.getElementById("heroName"),
    subtitle: document.getElementById("heroSubtitle"),
    actionPrimary: document.getElementById("heroPrimary"),
    actionSecondary: document.getElementById("heroSecondary"),
    cardTitle: document.getElementById("heroCardTitle"),
    cardText: document.getElementById("heroCardText"),
    cardAction: document.getElementById("heroCardAction"),
  },
  skillsGrid: document.getElementById("skillsGrid"),
  projectsGrid: document.getElementById("projectsGrid"),
  contact: {
    email: document.getElementById("contactEmail"),
    location: document.getElementById("contactLocation"),
    linkedin: document.getElementById("contactLinkedIn"),
    form: document.getElementById("contactForm"),
    notice: document.getElementById("formNotice"),
  },
};

const siteData = {
  profile: {
    name: "Faruk Islam",
    title: "Full‑stack Web & App Developer",
    tagline: "Building fast, accessible experiences for web and mobile.",
    resumeUrl: "#",
    siteDescription: "Portfolio of Faruk Islam, showcasing web and mobile projects.",
  },
  hero: {
    preface: "Hi, I'm",
    headline: "Faruk Islam",
    subtitle:
      "A <strong>Professional Developer</strong> who ships clean and maintainable apps.",
    primaryAction: {
      label: "View work",
      href: "#projects",
    },
    secondaryAction: {
      label: "Let’s chat",
      href: "#contact",
    },
    card: {
      title: "Latest work",
      text:
        "A portfolio built with modern web standards, progressive enhancement, and smooth UI interactions.",
      action: {
        label: "See projects",
        href: "#projects",
      },
    },
  },
  about: {
    title: "About",
    subtitle: "I craft digital experiences that make people say “wow.”",
    paragraphs: [
      "I’m a full‑stack developer specializing in web and mobile applications. I focus on clean code, scalable architecture, and delightful UX.",
      "My day-to-day includes building new features, optimizing performance, and collaborating across teams to ship polished product experiences.",
    ],
    stats: [
      { value: "6+", label: "Years experience" },
      { value: "30+", label: "Projects launched" },
      { value: "15+", label: "Happy clients" },
    ],
  },
  skills: [
    {
      name: "Frontend",
      detail: "React, Vue, HTML5, CSS3, JavaScript, TypeScript",
      icon: "https://via.placeholder.com/48x48?text=FE",
    },
    {
      name: "Backend",
      detail: "Node.js, Express, Python, Django, REST APIs",
      icon: "https://via.placeholder.com/48x48?text=BE",
    },
    {
      name: "Mobile",
      detail: "React Native, Expo, Cross-platform development",
      icon: "https://via.placeholder.com/48x48?text=Mobile",
    },
    {
      name: "Tools",
      detail: "Git, Docker, CI/CD, Testing, Performance optimization",
      icon: "https://via.placeholder.com/48x48?text=Tools",
    },
  ],
  projects: [
    {
      title: "Design System Kit",
      description:
        "A component library with accessible, themeable UI primitives for large-scale apps.",
      tags: ["React", "TypeScript", "Storybook"],
      liveUrl: "#",
      sourceUrl: "#",
      image: "https://via.placeholder.com/640x360?text=Design+System",
    },
    {
      title: "Task Tracker App",
      description:
        "A cross-platform productivity app with offline sync and push notifications.",
      tags: ["React Native", "Firebase", "Offline"],
      liveUrl: "#",
      sourceUrl: "#",
      image: "https://via.placeholder.com/640x360?text=Task+Tracker",
    },
    {
      title: "Marketing Site",
      description:
        "A performance-focused landing page with animations, A/B testing hooks, and CMS integration.",
      tags: ["Next.js", "Jamstack", "Vercel"],
      liveUrl: "#",
      sourceUrl: "#",
      image: "https://via.placeholder.com/640x360?text=Marketing+Site",
    },
  ],
  contact: {
    email: "hi@faruk.com",
    location: "Dhaka, Bangladesh",
    linkedin: {
      label: "linkedin.com/in/farukislamyt",
      href: "https://www.linkedin.com/in/farukislamyt/",
    },
    form: {
      success: "Thanks! Your message has been sent.",
      error: "Please fill in all fields to send your message.",
    },
  },
};

function setText(el, value) {
  if (!el) return;
  el.innerHTML = value;
}

function setHref(el, href) {
  if (!el) return;
  el.href = href;
}

function renderHero() {
  setText(dom.hero.preface, siteData.hero.preface);
  setText(dom.hero.title, siteData.hero.headline);

  // Start typing effect for subtitle
  const subtitleElement = dom.hero.subtitle;
  const subtitleText = siteData.hero.subtitle.replace(/<[^>]*>/g, ''); // Remove HTML tags for typing
  typeWriter(subtitleElement, subtitleText, 50);

  setText(dom.hero.actionPrimary, siteData.hero.primaryAction.label);
  setHref(dom.hero.actionPrimary, siteData.hero.primaryAction.href);

  setText(dom.hero.actionSecondary, siteData.hero.secondaryAction.label);
  setHref(dom.hero.actionSecondary, siteData.hero.secondaryAction.href);

  setText(dom.hero.cardTitle, siteData.hero.card.title);
  setText(dom.hero.cardText, siteData.hero.card.text);
  setText(dom.hero.cardAction, siteData.hero.card.action.label);
  setHref(dom.hero.cardAction, siteData.hero.card.action.href);
}

function renderAbout() {
  document.title = `${siteData.profile.name} | Portfolio`;
  setText(dom.logo, siteData.profile.name);

  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const aboutText = aboutSection.querySelector(".about__text");
  if (aboutText) {
    aboutText.innerHTML = `
      <p>${siteData.about.paragraphs[0]}</p>
      <p>${siteData.about.paragraphs[1]}</p>
      <a class="btn btn--primary" href="#contact">Get in touch</a>
    `;
  }

  const aboutProfile = aboutSection.querySelector(".about__profile");
  if (aboutProfile) {
    aboutProfile.innerHTML = `
      <div class="profile__image">
        <img src="https://via.placeholder.com/300x300?text=Profile+Photo" alt="${siteData.profile.name}" loading="lazy" />
      </div>
    `;
  }
}

function renderSkills() {
  if (!dom.skillsGrid) return;

  dom.skillsGrid.innerHTML = siteData.skills
    .map(
      (skill) =>
        `<div class="skill">
          <img class="skill__icon" src="${skill.icon}" alt="${skill.name} icon" loading="lazy" />
          <h3 class="skill__name">${skill.name}</h3>
          <p class="skill__detail">${skill.detail}</p>
        </div>`
    )
    .join("\n");
}

function renderProjects() {
  if (!dom.projectsGrid) return;

  dom.projectsGrid.innerHTML = siteData.projects
    .map((project) => {
      const image = project.image
        ? `<img class="project__image" src="${project.image}" alt="${project.title} screenshot" loading="lazy" />`
        : `<div class="project__placeholder" aria-hidden="true"><span>Project screenshot</span></div>`;

      const tags = project.tags
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("\n");

      return `
        <article class="project">
          <div class="project__media">
            ${image}
          </div>
          <div class="project__content">
            <h3 class="project__title">${project.title}</h3>
            <p class="project__description">${project.description}</p>
            <div class="project__tags">${tags}</div>
            <div class="project__actions">
              <a class="btn btn--tertiary" href="${project.liveUrl}" rel="noreferrer" target="_blank">Live</a>
              <a class="btn btn--tertiary" href="${project.sourceUrl}" rel="noreferrer" target="_blank">Source</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("\n");
}

function renderContact() {
  if (!dom.contact.email) return;

  setText(dom.contact.email, siteData.contact.email);
  setHref(dom.contact.email, `mailto:${siteData.contact.email}`);

  setText(dom.contact.location, siteData.contact.location);

  setText(dom.contact.linkedin, siteData.contact.linkedin.label);
  setHref(dom.contact.linkedin, siteData.contact.linkedin.href);
}

function updateYear() {
  if (!dom.year) return;
  dom.year.textContent = new Date().getFullYear();

  if (dom.footerName) {
    dom.footerName.textContent = siteData.profile.name;
  }
}

function showScrollTop() {
  if (!dom.scrollTopBtn) return;
  dom.scrollTopBtn.classList.toggle("visible", window.scrollY > 600);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleNav() {
  const willOpen = !dom.nav.classList.contains("nav--open");
  dom.nav.classList.toggle("nav--open", willOpen);
  document.body.classList.toggle("no-scroll", willOpen);
  dom.navToggle?.setAttribute("aria-expanded", String(willOpen));
}

function closeNav() {
  dom.nav.classList.remove("nav--open");
  document.body.classList.remove("no-scroll");
  dom.navToggle?.setAttribute("aria-expanded", "false");
}

function isMobileNavOpen() {
  return dom.nav.classList.contains("nav--open");
}

function handleNavLinkClick(event) {
  const anchor = event.currentTarget;
  const href = anchor.getAttribute("href");

  if (href && href.startsWith("#")) {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      closeNav();
    }
  }
}

function observeSections() {
  const sections = document.querySelectorAll("main section[id]");
  const options = {
    root: null,
    threshold: 0.45,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      dom.navLinks.forEach((link) => {
        link.classList.toggle(
          "nav__link--active",
          link.getAttribute("href") === `#${id}`
        );
      });
    });
  }, options);

  sections.forEach((section) => observer.observe(section));
}

function observeTimeline() {
  const timelineItems = document.querySelectorAll(".timeline__item");
  const options = {
    root: null,
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 200);
      }
    });
  }, options);

  timelineItems.forEach((item) => observer.observe(item));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = dom.contact.form;
  if (!form) return;

  const data = new FormData(form);
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  if (!name || !email || !message) {
    dom.contact.notice.textContent = siteData.contact.form.error;
    return;
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate form submission (replace with real endpoint)
  setTimeout(() => {
    dom.contact.notice.textContent = siteData.contact.form.success;
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    setTimeout(() => {
      dom.contact.notice.textContent = "";
    }, 5000);
  }, 1500);
}

function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add cursor blink effect
      element.classList.add('typing-done');
    }
  }

  type();
}

function createParticles() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heroSection.appendChild(particle);
  }
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat__value');
  const speed = 200;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/[^\d]/g, ''));
    const increment = target / speed;

    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + '+';
        setTimeout(updateCounter, 1);
      } else {
        counter.textContent = target + '+';
      }
    };

    // Start animation when element is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

function createSkillProgressBars() {
  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    const progressBar = document.createElement('div');
    progressBar.className = 'skill__progress';
    progressBar.innerHTML = '<div class="skill__progress-fill"></div>';

    skill.appendChild(progressBar);

    // Animate progress bar on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            progressBar.querySelector('.skill__progress-fill').style.width = '100%';
          }, index * 200);
        }
      });
    });

    observer.observe(skill);
  });
}

function createProjectModals() {
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('click', (e) => {
      // Don't open modal if clicking on links
      if (e.target.tagName === 'A') return;

      const title = project.querySelector('.project__title').textContent;
      const description = project.querySelector('.project__description').textContent;
      const image = project.querySelector('.project__image')?.src || project.querySelector('.project__placeholder')?.textContent;
      const tags = Array.from(project.querySelectorAll('.tag')).map(tag => tag.textContent);
      const liveLink = project.querySelector('a[href*="live"]')?.href;
      const sourceLink = project.querySelector('a[href*="source"]')?.href;

      showProjectModal({
        title,
        description,
        image,
        tags,
        liveLink,
        sourceLink
      });
    });
  });
}

function showProjectModal(project) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.innerHTML = `
    <div class="project-modal__content">
      <button class="project-modal__close" aria-label="Close modal">&times;</button>
      <div class="project-modal__image">
        ${project.image.includes('http') ?
          `<img src="${project.image}" alt="${project.title}" />` :
          `<div class="project-modal__placeholder">${project.image}</div>`
        }
      </div>
      <div class="project-modal__details">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <div class="project-modal__tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-modal__actions">
          ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="btn btn--primary">Live Demo</a>` : ''}
          ${project.sourceLink ? `<a href="${project.sourceLink}" target="_blank" class="btn btn--secondary">Source Code</a>` : ''}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.classList.add('no-scroll');

  // Close modal functionality
  const closeBtn = modal.querySelector('.project-modal__close');
  closeBtn.addEventListener('click', () => {
    modal.remove();
    document.body.classList.remove('no-scroll');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      document.body.classList.remove('no-scroll');
    }
  });

  // Animate modal in
  setTimeout(() => modal.classList.add('active'), 10);
}

function addScrollAnimations() {
  const sections = document.querySelectorAll('main section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Enhanced Animation Functions with Advanced CSS Effects
function addAttentionAnimations() {
  // Add attention animations to key elements on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '-50px 0px'
  };

  const attentionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('attention-pulse');
        }, index * 200);
      }
    });
  }, observerOptions);

  // Apply to important elements
  const attentionElements = document.querySelectorAll('.btn--primary, .skill, .project');
  attentionElements.forEach(el => attentionObserver.observe(el));
}

function addAdvancedTextEffects() {
  // Add wave effect to hero title
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    heroTitle.classList.add('wave-text');
  }

  // Add rainbow effect to section titles occasionally
  const sectionTitles = document.querySelectorAll('.section__title');
  if (sectionTitles.length > 0) {
    sectionTitles[0].classList.add('text-rainbow'); // Add to first section title
  }

  // Add neon effect to key phrases
  const keyPhrases = document.querySelectorAll('.hero__preface');
  keyPhrases.forEach(phrase => {
    phrase.classList.add('text-neon');
  });
}

function add3DEffects() {
  // Add floating 3D effect to profile image
  const profileImage = document.querySelector('.profile__image');
  if (profileImage) {
    profileImage.classList.add('floating-3d');
  }

  // Add cube rotation to skill icons
  const skillIcons = document.querySelectorAll('.skill__icon');
  skillIcons.forEach((icon, index) => {
    if (index % 3 === 0) { // Add to every third icon
      icon.classList.add('cube-rotate');
    }
  });
}

function addDynamicBackgrounds() {
  // Add dynamic background to body
  document.body.classList.add('dynamic-bg');

  // Add morphing blobs to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 3; i++) {
      const blob = document.createElement('div');
      blob.className = 'morph-blob';
      blob.style.cssText = `
        position: absolute;
        width: ${100 + Math.random() * 200}px;
        height: ${100 + Math.random() * 200}px;
        background: linear-gradient(45deg, ${i === 0 ? 'var(--primary)' : i === 1 ? 'var(--accent)' : 'var(--success)'}, transparent);
        border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%;
        opacity: 0.1;
        top: ${Math.random() * 80}%;
        left: ${Math.random() * 80}%;
        animation-delay: ${i * 2}s;
        pointer-events: none;
        z-index: 0;
      `;
      hero.appendChild(blob);
    }
  }
}

function addScrollDrivenAnimations() {
  const scrollElements = document.querySelectorAll('.skill, .project, .timeline__item');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Determine animation type based on position
        if (rect.left < window.innerWidth / 2) {
          element.classList.add('scroll-slide-left');
        } else {
          element.classList.add('scroll-slide-right');
        }

        // Add scale effect for center elements
        if (Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2) < 100) {
          element.classList.add('scroll-scale-in');
        }

        // Add rotation for special elements
        if (index % 5 === 0) {
          element.classList.add('scroll-rotate-in');
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });

  scrollElements.forEach(el => scrollObserver.observe(el));
}

function addCharacterAnimations() {
  // Add flying birds to hero background
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 2; i++) {
      const bird = document.createElement('div');
      bird.innerHTML = '🐦';
      bird.style.cssText = `
        position: absolute;
        font-size: 24px;
        top: ${30 + Math.random() * 40}%;
        left: -50px;
        pointer-events: none;
        z-index: 1;
        animation: bird-fly ${6 + Math.random() * 4}s linear infinite;
        animation-delay: ${i * 3}s;
      `;
      hero.appendChild(bird);
    }
  }

  // Add twinkling stars to background sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (Math.random() > 0.7) { // 30% chance
      for (let i = 0; i < 3; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.cssText = `
          position: absolute;
          font-size: 16px;
          top: ${Math.random() * 80}%;
          left: ${Math.random() * 80}%;
          pointer-events: none;
          z-index: 0;
          animation: star-twinkle ${1 + Math.random() * 2}s ease-in-out infinite;
          animation-delay: ${Math.random() * 3}s;
        `;
        section.appendChild(star);
      }
    }
  });
}

function addToggleSwitch() {
  // Add a demo toggle switch to the hero section
  const heroActions = document.querySelector('.hero__actions');
  if (heroActions) {
    const toggleContainer = document.createElement('div');
    toggleContainer.style.cssText = `
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
    `;

    toggleContainer.innerHTML = `
      <span style="color: var(--text-muted); font-size: 0.9rem;">Demo Mode:</span>
      <div class="toggle-switch" id="demoToggle">
        <span style="position: absolute; left: 60px; font-size: 0.8rem; color: var(--text-muted);">OFF</span>
      </div>
    `;

    heroActions.appendChild(toggleContainer);

    // Add toggle functionality
    const toggle = document.getElementById('demoToggle');
    let isActive = false;

    toggle.addEventListener('click', () => {
      isActive = !isActive;
      toggle.classList.toggle('active', isActive);

      // Trigger attention animation on all cards when toggled
      const cards = document.querySelectorAll('.skill, .project');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('attention-bounce');
          setTimeout(() => card.classList.remove('attention-bounce'), 1000);
        }, index * 100);
      });
    });
  }
}

function addMenuRevealAnimation() {
  const nav = document.querySelector('.nav');
  const navToggle = document.getElementById('navToggle');

  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      if (nav.classList.contains('nav--open')) {
        // Menu is closing
        nav.classList.remove('menu-reveal');
      } else {
        // Menu is opening
        setTimeout(() => nav.classList.add('menu-reveal'), 100);
      }
    });
  }
}

function addPropertyChangeAnimations() {
  // Add color shifting to progress bars
  const progressBars = document.querySelectorAll('.skill__progress-fill');
  progressBars.forEach((bar, index) => {
    if (index % 2 === 0) { // Add to every other bar
      bar.classList.add('color-shift');
    }
  });

  // Add width expansion to timeline items
  const timelineItems = document.querySelectorAll('.timeline__item');
  timelineItems.forEach(item => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('width-expand');
        }
      });
    });
    observer.observe(item);
  });
}

// Advanced Loading Animation with Skeleton Screens
function createLoadingAnimation() {
  const body = document.body;
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-screen';
  loadingScreen.innerHTML = `
    <div class="loading-content">
      <div class="loading-logo">
        <div class="skeleton skeleton-text skeleton-title"></div>
        <div class="skeleton skeleton-text skeleton-subtitle"></div>
      </div>
      <div class="loading-progress">
        <div class="loading-bar">
          <div class="loading-fill"></div>
        </div>
      </div>
    </div>
  `;

  body.appendChild(loadingScreen);

  // Simulate loading
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.remove();
      document.body.classList.add('loaded');
      initPageAnimations();
    }, 500);
  }, 2000);
}

// Initialize all page animations after loading
function initPageAnimations() {
  addStaggerAnimations();
  add3DCardEffects();
  addGradientTextAnimation();
  addCustomCursor();
  addFloatingElements();
  addImageHoverEffects();
  addTextRevealEffects();
  addMagneticButtons();
  addBackgroundGradientAnimation();
  addShapeMorphing();
  addEnhancedScrollEffects();
}

// Stagger animations for lists and grids
function addStaggerAnimations() {
  const skills = document.querySelectorAll('.skill');
  const projects = document.querySelectorAll('.project');
  const timelineItems = document.querySelectorAll('.timeline__item');

  const animateElements = (elements, delay = 100) => {
    elements.forEach((element, index) => {
      element.style.animationDelay = `${index * delay}ms`;
      element.classList.add('stagger-in');
    });
  };

  animateElements(skills, 150);
  animateElements(projects, 200);
  animateElements(timelineItems, 250);
}

// 3D Card Effects
function add3DCardEffects() {
  const cards = document.querySelectorAll('.skill, .project');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

// Gradient Text Animation
function addGradientTextAnimation() {
  const gradientTexts = document.querySelectorAll('.hero__name, .section__title');

  gradientTexts.forEach(text => {
    text.classList.add('gradient-text');
  });
}

// Custom Cursor Effects
function addCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  document.body.appendChild(cursorDot);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;

    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .skill, .project');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorDot.classList.remove('hover');
    });
  });
}

// Floating Elements
function addFloatingElements() {
  const floatingContainer = document.createElement('div');
  floatingContainer.className = 'floating-elements';
  document.body.appendChild(floatingContainer);

  for (let i = 0; i < 8; i++) {
    const element = document.createElement('div');
    element.className = `floating-element floating-element-${i + 1}`;
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.animationDelay = `${Math.random() * 10}s`;
    element.style.animationDuration = `${Math.random() * 10 + 15}s`;
    floatingContainer.appendChild(element);
  }
}

// Image Hover Effects
function addImageHoverEffects() {
  const images = document.querySelectorAll('.project__image, .profile__image img');

  images.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.classList.add('image-hover');
    });

    img.addEventListener('mouseleave', () => {
      img.classList.remove('image-hover');
    });
  });
}

// Text Reveal Effects
function addTextRevealEffects() {
  const textElements = document.querySelectorAll('.about__text p, .section__description');

  textElements.forEach(text => {
    const words = text.textContent.split(' ');
    text.innerHTML = words.map(word => `<span class="reveal-word">${word}</span>`).join(' ');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const words = entry.target.querySelectorAll('.reveal-word');
          words.forEach((word, index) => {
            setTimeout(() => {
              word.classList.add('revealed');
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(text);
  });
}

// Magnetic Buttons
function addMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

// Background Gradient Animation
function addBackgroundGradientAnimation() {
  const body = document.body;
  body.classList.add('animated-background');
}

// Shape Morphing Animation
function addShapeMorphing() {
  const morphingShape = document.createElement('div');
  morphingShape.className = 'morphing-shape';
  document.body.appendChild(morphingShape);

  // Random morphing animation
  setInterval(() => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    morphingShape.style.borderRadius = `${Math.random() * 50 + 25}% ${Math.random() * 50 + 25}% ${Math.random() * 50 + 25}% ${Math.random() * 50 + 25}%`;
    morphingShape.style.left = `${randomX}%`;
    morphingShape.style.top = `${randomY}%`;
  }, 3000);
}

// Enhanced Scroll Effects
function addEnhancedScrollEffects() {
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    // Parallax effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${currentScrollY * 0.5}px)`;
    }

    // Dynamic navbar
    const nav = document.querySelector('.nav');
    if (nav) {
      if (currentScrollY > 100) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }

    lastScrollY = currentScrollY;
  });
}

// Page Transition Effects
function addPageTransitions() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));

      // Add transition class
      document.body.classList.add('page-transitioning');

      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
        document.body.classList.remove('page-transitioning');
      }, 300);
    });
  });
}

// Set dark theme only
function setTheme() {
  document.documentElement.dataset.theme = "dark";
}

function init() {
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
  updateYear();

  if (dom.navToggle) {
    dom.navToggle.addEventListener("click", toggleNav);
  }

  dom.navLinks.forEach((link) => {
    link.addEventListener("click", handleNavLinkClick);
  });

  if (dom.scrollTopBtn) {
    dom.scrollTopBtn.addEventListener("click", scrollToTop);
  }

  window.addEventListener("scroll", showScrollTop);

  if (dom.contact.form) {
    dom.contact.form.addEventListener("submit", handleFormSubmit);
  }

  // Initialize interactive features
  createLoadingAnimation();
  createParticles();
  animateCounters();
  createSkillProgressBars();
  createProjectModals();
  addScrollAnimations();
  addMouseParallax();
  addPageTransitions();

  // Initialize advanced animations
  addAttentionAnimations();
  addAdvancedTextEffects();
  add3DEffects();
  addDynamicBackgrounds();
  addScrollDrivenAnimations();
  addCharacterAnimations();
  addToggleSwitch();
  addMenuRevealAnimation();
  addPropertyChangeAnimations();
}

document.addEventListener("DOMContentLoaded", init);
