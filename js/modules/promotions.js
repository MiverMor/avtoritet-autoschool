gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray('.promotions__card');

if (window.innerWidth >= 992) {
  gsap.from(cards, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    clearProps: 'transform,opacity',

    scrollTrigger: {
      trigger: '.promotions__cards',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play reverse play reverse',
    },
  });
} else {
  cards.forEach((card) => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'transform,opacity',

      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        end: 'bottom 12%',
        toggleActions: 'play reverse play reverse',
      },
    });
  });
}
