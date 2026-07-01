export function initStickyHeader() {
  const header = document.querySelector('.header');

  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  handleScroll();

  window.addEventListener('scroll', handleScroll);
}
