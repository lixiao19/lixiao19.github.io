'use strict';

const filters = document.querySelectorAll('[data-year]');
const papers = document.querySelectorAll('[data-paper-year]');
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('selected', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    papers.forEach(paper => {
      paper.hidden = button.dataset.year !== 'all' && paper.dataset.paperYear !== button.dataset.year;
    });
  });
});

const navLinks = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-5% 0px -65% 0px', threshold: 0 });
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) observer.observe(section);
  });
}

document.getElementById('current-year').textContent = new Date().getFullYear();
