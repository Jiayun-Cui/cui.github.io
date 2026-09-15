// Smooth active nav highlighting and mobile toggle
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle?.addEventListener('click', () => {
    nav.classList.toggle('open');
    nav.style.display = nav.classList.contains('open') ? 'flex' : '';
  });

  // Click handlers: close mobile menu after click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // default anchor scroll works (CSS scroll-behavior). If you want offset adjust, uncomment below.
      // e.preventDefault();
      // const target = document.querySelector(link.getAttribute('href'));
      // window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });

      // close mobile nav if open
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        nav.style.display = '';
      }
    });
  });

  // Highlight active nav while scrolling using IntersectionObserver
  const options = {
    root: null,
    rootMargin: `-${Math.round(headerHeight / 2)}px 0px -${Math.round(headerHeight / 2)}px 0px`,
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
      }
    });
  }, options);

  sections.forEach(s => observer.observe(s));

  // set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
});
