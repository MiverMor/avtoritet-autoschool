gsap.registerPlugin(ScrollTrigger);

// gsap.from('.steps__card', {
//   y: 60,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.15,
//   ease: 'power3.out',
//   clearProps: 'transform,opacity',
//   scrollTrigger: {
//     trigger: '.steps__cards',
//     start: 'top 80%',
//     end: 'bottom 20%',
//     toggleActions: 'play reverse play reverse',
//   },
// });
const cards = gsap.utils.toArray('.steps__card');
if (window.innerWidth >= 992) {
  // ПК
  gsap.from(cards, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
    scrollTrigger: {
      trigger: '.steps__cards',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play reverse play reverse',
    },
  });
} else {
  // Планшеты и телефоны
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
