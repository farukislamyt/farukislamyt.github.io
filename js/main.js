/* =============================================
   FARUK ISLAM v2 — PORTFOLIO JS
   ============================================= */
'use strict';

// ── PAGE LOADER ──
(function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loader-fill');
  const txt    = document.getElementById('loader-text');
  const steps  = ['Loading assets...','Building UI...','Almost there...','Ready!'];
  let progress = 0, step = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 28 + 12;
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';
    txt.textContent = steps[step] || steps[steps.length - 1];
    if (progress < 40) step = 0;
    else if (progress < 70) step = 1;
    else if (progress < 95) step = 2;
    else step = 3;
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => loader.classList.add('done'), 400);
    }
  }, 150);
})();

// ── SCROLL PROGRESS BAR ──
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

// ── CUSTOM CURSOR ──
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor) return;
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
  (function loop() { fx += (mx - fx) * 0.1; fy += (my - fy) * 0.1; follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; requestAnimationFrame(loop); })();
  document.addEventListener('mouseleave', () => { cursor.style.opacity='0'; follower.style.opacity='0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity='1'; follower.style.opacity='1'; });
})();

// ── DARK / LIGHT THEME ──
(function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('fi-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('fi-theme', next);
  });
})();

// ── NAVBAR ──
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── HAMBURGER ──
(function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  btn.addEventListener('click', () => { btn.classList.toggle('open'); menu.classList.toggle('open'); });
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => { btn.classList.remove('open'); menu.classList.remove('open'); }));
})();

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' }); }
  });
});

// ── REVEAL ON SCROLL ──
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

// ── SKILL BARS ──
(function initBars() {
  const bars = document.querySelectorAll('.bar-f');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('go'), 250); obs.unobserve(e.target); } });
  }, { threshold: 0.4 });
  bars.forEach(b => obs.observe(b));
})();

// ── STAT COUNTER ANIMATION ──
(function initCounters() {
  const els = document.querySelectorAll('.stat-num[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let start = 0; const dur = 1600;
      const t0 = performance.now();
      function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.7 });
  els.forEach(el => obs.observe(el));
})();

// ── TYPING EFFECT ──
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const phrases = ['Full Stack Developer','React & Node.js Expert','API Architect','UI/UX Enthusiast','Problem Solver'];
  let i = 0, j = 0, deleting = false;
  function tick() {
    const phrase = phrases[i];
    el.textContent = deleting ? phrase.slice(0, j--) : phrase.slice(0, j++);
    if (!deleting && j > phrase.length) { deleting = true; setTimeout(tick, 1800); return; }
    if (deleting && j < 0) { deleting = false; i = (i + 1) % phrases.length; j = 0; }
    setTimeout(tick, deleting ? 42 : 76);
  }
  setTimeout(tick, 2000);
})();

// ── PROJECT FILTER ──
(function initFilter() {
  const tabs  = document.querySelectorAll('.ftab');
  const cards = document.querySelectorAll('#proj-grid .proj-card');
  const feat  = document.querySelector('.proj-featured');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      // featured
      if (feat) {
        const fc = feat.dataset.cat;
        feat.style.display = (filter === 'all' || filter === fc) ? '' : 'none';
      }

      cards.forEach(card => {
        const cat = card.dataset.cat;
        const show = filter === 'all' || cat === filter;
        if (show) { card.classList.remove('hidden'); } else { card.classList.add('hidden'); }
      });
    });
  });
})();

// ── TILT EFFECT ──
(function initTilt() {
  document.querySelectorAll('.proj-card, .sk-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

// ── BACK TO TOP ──
(function initBTT() {
  const btn = document.getElementById('btt');
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── ACTIVE NAV HIGHLIGHT ──
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links li a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(l => {
      l.style.color = '';
      if (l.getAttribute('href') === '#' + cur) l.style.color = 'var(--text)';
    });
  }, { passive: true });
})();

// ── CONTACT FORM ──
(function initForm() {
  const form = document.getElementById('contact-form');
  const succ = document.getElementById('cform-success');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.cform-btn');
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;
    setTimeout(() => {
      form.reset();
      succ.classList.add('show');
      btn.innerHTML = '<span>Send Message</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      btn.disabled = false;
      setTimeout(() => succ.classList.remove('show'), 5000);
    }, 1200);
  });
})();

// ── PARTICLES CANVAS ──
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 55; i++) {
    dots.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,102,241,${d.o})`;
      ctx.fill();
    });
    // Draw connecting lines
    dots.forEach((a, i) => {
      dots.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

console.log('%c🚀 Faruk Islam Portfolio v2', 'color:#6366f1;font-size:16px;font-weight:bold');
console.log('%cBuilt with care in Dhaka 🇧🇩', 'color:#14b8a6;font-size:12px');
