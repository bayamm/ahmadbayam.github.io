/* global.js — nav, fade-up, mobile menu, image upload */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Active nav link ── */
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === file) a.classList.add('active');
  });

  /* ── Mobile menu ── */
  const toggle = document.querySelector('.nav-toggle');
  const mob    = document.querySelector('.nav-mobile');
  if (toggle && mob) {
    toggle.addEventListener('click', () => mob.classList.toggle('open'));
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));
  }

  /* ── Fade-up on scroll ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fu').forEach((el, i) => {
    if (el.dataset.d) el.style.transitionDelay = el.dataset.d;
    io.observe(el);
  });

  /* ── Skill bars animate on view ── */
  const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(f => {
          f.style.width = f.dataset.pct;
        });
        barIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-group').forEach(g => barIO.observe(g));

});

/* ── Image upload helper ── */
function makeUploadable(triggerId, inputId, imgId, placeholderId) {
  const trigger = document.getElementById(triggerId);
  const input   = document.getElementById(inputId);
  if (!trigger || !input) return;
  trigger.addEventListener('click', () => input.click());
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      if (imgId) {
        const img = document.getElementById(imgId);
        if (img) { img.src = e.target.result; img.style.display = 'block'; }
      }
      if (placeholderId) {
        const ph = document.getElementById(placeholderId);
        if (ph) ph.style.display = 'none';
      }
    };
    reader.readAsDataURL(file);
  });
}
