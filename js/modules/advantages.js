gsap.registerPlugin(ScrollTrigger);

// ======================================
// Заголовок секции
// ======================================
gsap.from('.advantages__title, .advantages__subtitle, .advantages__text', {
  scrollTrigger: {
    trigger: '.advantages',
    start: 'top 75%',
    toggleActions: 'play reverse play reverse',
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
});

// ======================================
// Карточки
// ======================================
gsap.fromTo(
  '.advantages__card',
  {
    y: 50,
    opacity: 0,
    // scale: 0.96,
  },
  {
    y: 0,
    opacity: 1,
    // scale: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    clearProps: 'transform',

    scrollTrigger: {
      trigger: '.advantages__cards',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  },
);

// ======================================
// Иконки
// ======================================
gsap.from('.advantages__icon', {
  scrollTrigger: {
    trigger: '.advantages__cards',
    start: 'top 85%',
    toggleActions: 'play reverse play reverse',
  },
  opacity: 0,
  // scale: 0.6,
  // rotate: -12,
  duration: 0.7,
  // stagger: 0.08,
  ease: 'back.out(2)',
});

// ======================================
// Текст карточек
// ======================================
gsap.from('.advantages__item-text', {
  scrollTrigger: {
    trigger: '.advantages__cards',
    start: 'top 80%',
    toggleActions: 'play reverse play reverse',
  },
  opacity: 0,
  y: 18,
  duration: 0.5,
  stagger: 0.08,
  ease: 'power2.out',
});