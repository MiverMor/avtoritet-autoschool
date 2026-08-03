gsap.registerPlugin(ScrollTrigger);

function initStepsAnimation() {
  // Удаляем только триггеры этой секции
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.trigger?.classList?.contains('steps__cards') ||
      trigger.trigger?.classList?.contains('steps__card')
    ) {
      trigger.kill();
    }
  });

  // Сбрасываем стили GSAP
  gsap.set('.steps__card', { clearProps: 'all' });

  const cards = gsap.utils.toArray('.steps__card');

  if (window.innerWidth >= 992) {
    // Десктоп
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',

      scrollTrigger: {
        trigger: '.steps__cards',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play reverse play reverse',
        invalidateOnRefresh: true,
      },

      clearProps: 'transform,opacity',
    });
  } else {
    // Планшеты и телефоны
    cards.forEach((card) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          end: 'bottom 12%',
          toggleActions: 'play reverse play reverse',
          invalidateOnRefresh: true,
        },

        clearProps: 'transform,opacity',
      });
    });
  }

  ScrollTrigger.refresh();
}

// Инициализация
initStepsAnimation();

// Фикс для resize
let resizeTimer;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    initStepsAnimation();
  }, 200);
});
