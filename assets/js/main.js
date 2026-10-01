document.documentElement.classList.add('js');

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
