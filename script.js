// ── Nav scroll shadow ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ── Mobile nav toggle ─────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}


// ── Active nav link highlight on scroll ───────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('#nav-menu a');

function setActiveLink() {
  const scrollY = window.scrollY + 90;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${id}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();


// ── Fade-in on scroll (IntersectionObserver) ──────
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });

fadeEls.forEach(el => observer.observe(el));


// ── Publication filter (All / First Author) ───────
(function () {
  const btns   = document.querySelectorAll('.pub-filter-btn');
  const items  = document.querySelectorAll('.ul-papers > li');
  const slider = document.querySelector('.filter-slider');

  function updateSlider(animate) {
    const activeBtn = document.querySelector('.pub-filter-btn.active');
    if (!slider || !activeBtn) return;
    if (!animate) slider.style.transition = 'none';
    slider.style.width = activeBtn.offsetWidth + 'px';
    slider.style.left  = activeBtn.offsetLeft + 'px';
    if (!animate) {
      slider.offsetWidth; // force reflow
      slider.style.transition = '';
    }
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateSlider(true);

      const filter = btn.getAttribute('data-filter');
      items.forEach(li => {
        if (filter === 'all' || li.classList.contains('first-author')) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      });
    });
  });

  updateSlider(false);
  window.addEventListener('resize', () => updateSlider(true));
  window.addEventListener('load',   () => updateSlider(false));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => updateSlider(false));
  }
})();


// ── Footer year ───────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
