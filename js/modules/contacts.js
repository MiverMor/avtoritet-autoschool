gsap.registerPlugin(ScrollTrigger);

// Заголовок секции
gsap.from('.contacts__title, .contacts__subtitle, .contacts__text', {
  scrollTrigger: {
    trigger: '.contacts',
    start: 'top 75%',
  },

  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
});

// Карточки контактов
if (window.innerWidth >= 768) {
  gsap.from('.contacts__card', {
    scrollTrigger: {
      trigger: '.contacts__info',
      start: 'top 80%',
      toggleActions: 'play reverse play reverse',
    },

    y: 35,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
  });
} else {
  // На мобилках — по одной карточке
  document.querySelectorAll('.contacts__card').forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play reverse play reverse',
      },

      y: 24,
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
    });
  });
}

// Кнопка мессенджера
gsap.from('.contacts__messenger', {
  scrollTrigger: {
    trigger: '.contacts__messenger',
    start: 'top 92%',
  },

  scale: 0.92,
  opacity: 0,
  duration: 0.55,
  ease: 'back.out(1.8)',
});

// Форма
gsap.from('.contacts__form-wrapper', {
  scrollTrigger: {
    trigger: '.contacts__form-wrapper',
    start: 'top 82%',
    toggleActions: 'play reverse play reverse',
  },

  x: window.innerWidth >= 992 ? 50 : 0,
  y: window.innerWidth < 992 ? 30 : 0,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  clearProps: 'transform,opacity',
});

// Поля формы
if (window.innerWidth >= 768) {
  gsap.from('.contacts__field', {
    scrollTrigger: {
      trigger: '.contacts__form',
      start: 'top 88%',
    },

    y: 18,
    opacity: 0,
    duration: 0.45,
    stagger: 0.08,
    ease: 'power2.out',
  });
}

// Кнопка отправки
gsap.from('.contacts__submit', {
  scrollTrigger: {
    trigger: '.contacts__submit',
    start: 'top 95%',
  },

  y: 16,
  opacity: 0,
  scale: 0.96,
  duration: 0.5,
  ease: 'back.out(1.7)',
});
