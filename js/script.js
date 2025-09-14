document.addEventListener('DOMContentLoaded', () => {
  /* MENU BURGER MOBILE */
  const nav = document.querySelector('.main-nav');
  const toggleBtn = document.querySelector('.nav-toggle');
  if (nav && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  /* Apparition au scroll */
  const sections = document.querySelectorAll('.fade-in-section');
  if (sections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    sections.forEach(s => obs.observe(s));
  }

  /* Thème sombre uniquement (aucune alternance) */
  document.documentElement.removeAttribute('data-theme');
  try { localStorage.removeItem('theme'); } catch(e){}

  /* Classe active auto dans la nav */
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    const isHome = (current === '' || current === 'index.html') && (href === '/' || href.endsWith('index.html'));
    const match = href.endsWith(current) || isHome;
    a.classList.toggle('active', match);
  });
});
