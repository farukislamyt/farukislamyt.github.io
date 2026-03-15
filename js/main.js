const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll(".nav__link");
const scrollTopBtn = document.getElementById("scrollTop");
const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formNotice = document.getElementById("formNotice");

function toggleNav() {
  nav.classList.toggle("nav--open");
}

function closeNav() {
  if (nav.classList.contains("nav--open")) {
    nav.classList.remove("nav--open");
  }
}

function setActiveLink() {
  const current = window.scrollY + window.innerHeight * 0.25;
  const sections = document.querySelectorAll("main section[id]");

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (current >= top && current < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle(
          "nav__link--active",
          link.getAttribute("href") === `#${id}`
        );
      });
    }
  });
}

function showScrollTop() {
  if (window.scrollY > 600) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateYear() {
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  // Example form handling: replace with your preferred backend or service.
  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    formNotice.textContent = "Please fill in all fields before sending.";
    return;
  }

  formNotice.textContent = "Thanks! Your message has been recorded (placeholder).";
  contactForm.reset();

  setTimeout(() => {
    formNotice.textContent = "";
  }, 6000);
}

navToggle.addEventListener("click", toggleNav);
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNav();
  });
});

scrollTopBtn.addEventListener("click", scrollToTop);
window.addEventListener("scroll", () => {
  setActiveLink();
  showScrollTop();
});

contactForm.addEventListener("submit", handleFormSubmit);

updateYear();
setActiveLink();
showScrollTop();
