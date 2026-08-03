gsap.registerPlugin(ScrollTrigger);

// ======================================
// Заголовок секции
// ======================================
gsap.from('.students__title, .students__subtitle, .students__text', {
  scrollTrigger: {
    trigger: '.students',
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
  '.students__card',
  {
    y: 60,
    opacity: 0,
    // scale: 0.97,
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
      trigger: '.students__warnings',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  },
);

// ======================================
// Заголовки карточек
// ======================================
gsap.from('.students__card-title', {
  scrollTrigger: {
    trigger: '.students__warnings',
    start: 'top 82%',
    toggleActions: 'play reverse play reverse',
  },
  opacity: 0,
  y: 18,
  duration: 0.45,
  stagger: 0.1,
  ease: 'power2.out',
});

// ======================================
// Пункты внутри карточек
// ======================================
gsap.utils.toArray('.students__card-list').forEach((list) => {
  gsap.from(list.querySelectorAll('.students__card-list li'), {
    scrollTrigger: {
      trigger: list,
      start: 'top 90%',
      toggleActions: 'play reverse play reverse',
    },
    opacity: 0,
    x: -20,
    stagger: 0.1,
    duration: 0.35,
    ease: 'power2.out',
  });
});

