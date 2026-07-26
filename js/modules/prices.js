gsap.registerPlugin(ScrollTrigger);

// ======================================
// Заголовок секции
// ======================================
gsap.from('.prices__title, .prices__subtitle, .prices__text', {
  scrollTrigger: {
    trigger: '.prices',
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
  '.prices__card',
  {
    y: 60,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    clearProps: 'transform',

    scrollTrigger: {
      trigger: '.prices__cards',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  },
);

// ======================================
// Badge
// ======================================
gsap.from('.prices__badge', {
  scrollTrigger: {
    trigger: '.prices__cards',
    start: 'top 85%',
    toggleActions: 'play reverse play reverse',
  },
  opacity: 0,
  y: -25,
  scale: 0.8,
  duration: 0.8,
  ease: 'back.out(2)',
});

// ======================================
// Пункты внутри карточек
// ======================================
gsap.utils.toArray('.prices__list').forEach((list) => {
  gsap.from(list.querySelectorAll('.prices__item'), {
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

// ======================================
// Нижний блок
// ======================================
gsap.fromTo(
  '.prices__bottom',
  {
    y: 60,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    clearProps: 'transform',

    scrollTrigger: {
      trigger: '.prices__bottom',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  },
);

// ======================================
// Пункты преимуществ
// ======================================
gsap.from('.prices__advantages .prices__item', {
  scrollTrigger: {
    trigger: '.prices__bottom',
    start: 'top 80%',
    toggleActions: 'play reverse play reverse',
  },
  opacity: 0,
  x: -25,
  stagger: 0.12,
  duration: 0.4,
  ease: 'power2.out',
});

// ======================================
// Текст снизу
// ======================================
gsap.from('.prices__bottom-text', {
  scrollTrigger: {
    trigger: '.prices__bottom',
    start: 'top 75%',
    toggleActions: 'play reverse play reverse',
  },
  opacity: 0,
  y: 20,
  delay: 0.2,
  duration: 0.5,
});
