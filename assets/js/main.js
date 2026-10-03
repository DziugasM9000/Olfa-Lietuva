document.documentElement.classList.add('js');

// Mobile menu
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
if (header && navToggle) {
  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Uždaryti meniu' : 'Atidaryti meniu');
  };
  navToggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  header.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) { setOpen(false); navToggle.focus(); }
  });
  document.addEventListener('click', (e) => { if (!header.contains(e.target)) setOpen(false); });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveals
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}

// Heritage section: snap the first blade segment when it comes into view
const blade = document.querySelector('.blade');
if (blade) {
  if ('IntersectionObserver' in window) {
    const bladeIo = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      blade.classList.add('is-snapped');
      bladeIo.disconnect();
    }, { threshold: 0.6 });
    bladeIo.observe(blade);
  } else {
    blade.classList.add('is-snapped');
  }
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
