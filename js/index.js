// nav active au scroll
(function() {
  const sections = ['enjeux', 'catala', 'odap', 'protos', 'ress', 'about'];
  const navLinks = document.querySelectorAll('.book-header__nav a');

  function updateActive() {
    let active = sections[0];
    const scrollY = window.scrollY + 120;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) active = id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('is-active', href === active);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
