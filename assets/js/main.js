document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.nav-links');

  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');

      menu.setAttribute('aria-expanded', open);
      document.body.classList.toggle('menu-open', open);
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const element = document.querySelector(link.getAttribute('href'));

      if (element) {
        event.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          reveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll('.section, .project, .skill-grid article, .contact')
    .forEach((element) => {
      element.classList.add('reveal');
      reveal.observe(element);
    });
});
