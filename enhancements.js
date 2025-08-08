// enhancements.js
// Light UX enhancements and defensive guards
(function () {
  function safe(fn) {
    try { fn(); } catch (e) { /* no-op */ }
  }

  // Smooth scroll for internal anchors (if any exist)
  safe(() => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const targetId = a.getAttribute('href')?.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  });

  // Add pressed visual feedback to buttons
  safe(() => {
    document.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('mousedown', () => btn.classList.add('is-pressed'));
      btn.addEventListener('mouseup', () => btn.classList.remove('is-pressed'));
      btn.addEventListener('mouseleave', () => btn.classList.remove('is-pressed'));
    });
  });
})();