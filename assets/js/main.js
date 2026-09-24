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

// Product gallery
const gallery = document.querySelector('[data-gallery]');
if (gallery) {
  const main = gallery.querySelector('.gallery__main img');
  const thumbs = gallery.querySelectorAll('.gallery__thumbs button');
  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.getAttribute('aria-pressed') === 'true') return;
      thumbs.forEach((t) => t.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');

      const swap = () => {
        main.src = btn.dataset.src;
        main.alt = btn.dataset.alt;
        main.classList.toggle('is-cover', btn.dataset.fit === 'cover');
        main.classList.remove('is-fading');
      };
      if (reduceMotion) return swap();
      main.classList.add('is-fading');
      setTimeout(swap, 180);
    });
  });
}

// Mobile buy bar: visible only while the main buy button is off screen
const buybar = document.querySelector('.buybar');
const mainBuy = document.querySelector('[data-main-buy]');
if (buybar && mainBuy && 'IntersectionObserver' in window) {
  document.body.classList.add('has-buybar');
  new IntersectionObserver(([entry]) => {
    const hidden = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    buybar.classList.toggle('is-visible', hidden);
    buybar.inert = !hidden;
  }).observe(mainBuy);
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
