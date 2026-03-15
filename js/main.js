/*
  Dynamic portfolio renderer
  - Uses a simple data model (siteData) to populate the template
  - Includes a theme toggle (dark/light) with persistence
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
  themeToggle: document.getElementById("themeToggle"),
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
      name: "Web Technologies",
      detail:
        "HTML, CSS, JavaScript, Progressive Enhancement, and responsive layouts.",
    },
    {
      name: "Frameworks",
      detail: "React, Vue, Svelte, Next.js, and responsive component libraries.",
    },
    {
      name: "Mobile Apps",
      detail: "React Native / Expo and cross-platform experiences.",
    },
    {
      name: "Tooling",
      detail: "Git, CI/CD, Docker, unit testing, and performance tooling.",
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
      label: "linkedin.com/in/farukislam",
      href: "https://www.linkedin.com/in/farukislam/",
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
  setText(dom.hero.subtitle, siteData.hero.subtitle);

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

  const paragraphs = siteData.about.paragraphs
    .map((p) => `<p>${p}</p>`)
    .join("\n");

  const statsHtml = siteData.about.stats
    .map(
      (stat) =>
        `<div class="stat"><span class="stat__value">${stat.value}</span><span class="stat__label">${stat.label}</span></div>`
    )
    .join("\n");

  const aboutText = aboutSection.querySelector(".about__text");
  if (aboutText) {
    aboutText.innerHTML = `
      <p>${siteData.about.paragraphs[0]}</p>
      <p>${siteData.about.paragraphs[1]}</p>
      <a class="btn btn--primary" href="#contact">Get in touch</a>
    `;
  }

  const aboutStats = aboutSection.querySelector(".about__stats");
  if (aboutStats) {
    aboutStats.innerHTML = statsHtml;
  }
}

function renderSkills() {
  if (!dom.skillsGrid) return;

  dom.skillsGrid.innerHTML = siteData.skills
    .map(
      (skill) =>
        `<div class="skill">
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

  // Replace this with your backend endpoint or form service.
  dom.contact.notice.textContent = siteData.contact.form.success;
  form.reset();

  setTimeout(() => {
    dom.contact.notice.textContent = "";
  }, 5000);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (!dom.themeToggle) return;

  dom.themeToggle.textContent = theme === "light" ? "☀️" : "🌙";
  dom.themeToggle.title = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

function initTheme() {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  setTheme(theme);
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

  if (dom.themeToggle) {
    dom.themeToggle.addEventListener("click", toggleTheme);
  }

  observeSections();
  initTheme();
  showScrollTop();
}

document.addEventListener("DOMContentLoaded", init);
