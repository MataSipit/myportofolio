/* ═══════════════════════════════════════════
   KHAIRU KINARTA — PORTFOLIO v2
   script.js
═══════════════════════════════════════════ */

// ─── THEME TOGGLE ───
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
});

// ─── NAVBAR SCROLL EFFECT ───
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// ─── ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === current);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

mobileClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// Tutup jika klik area gelap di luar menu
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    mobileMenu.classList.remove('open');
  }
});

// Tutup jika tekan Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') mobileMenu.classList.remove('open');
});

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── COUNT-UP ANIMATION ───
const statNumbers = document.querySelectorAll('.stat-number');
let counted = false;

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current);
        }, 16);
      });
    }
  });
}, { threshold: 0.5 });

if (statNumbers.length > 0) {
  const statsGrid = statNumbers[0].closest('.stats-grid');
  if (statsGrid) countObserver.observe(statsGrid);
}

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btnSpan = contactForm.querySelector('.btn-submit span');
  const btn = contactForm.querySelector('.btn-submit');
  btnSpan.textContent = 'Terkirim! ✓';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btnSpan.textContent = 'Kirim Pesan';
    btn.style.opacity = '1';
    contactForm.reset();
  }, 3000);
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
