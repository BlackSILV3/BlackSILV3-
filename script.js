// ===== BLACKSILV PORTFOLIO - script.js =====

document.addEventListener('DOMContentLoaded', () => {

  // === CUSTOM CURSOR ===
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');

  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    });

    (function animateRing() {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .card, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  // === NAV SCROLL EFFECT ===
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // === MOBILE MENU ===
  const menuBtn   = document.querySelector('.nav-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn  = document.querySelector('.mobile-close');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // === SCROLL REVEAL ===
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // === TYPEWRITER (hero) ===
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const words = ['Frontend Developer', 'UI Craftsman', 'Wave Maker', 'Digital Builder'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
      const word = words[wi];
      typeEl.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);

      if (!deleting && ci > word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      if (deleting && ci < 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
      setTimeout(type, deleting ? 55 : 95);
    }
    type();
  }

  // === ACTIVE NAV LINK ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.style.color = 'var(--amber)';
    }
  });

});