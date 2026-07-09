const car = document.querySelector('.hero__car');

if (car) {
  gsap.to(car, {
    y: -8,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });
}

const circle = document.querySelector('.hero__circle');

if (circle) {
  gsap.to(circle, {
    scale: 1.03,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    transformOrigin: 'center center',
  });
}

const headlights = document.querySelector('.hero__headlights');
const hero = document.querySelector('.hero');

hero.addEventListener('mousemove', (e) => {
  const rect = car.getBoundingClientRect();

  const inside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  gsap.to(headlights, {
    opacity: inside ? 1 : 0,
    duration: 2,
  });
});

const isTouch = window.matchMedia('(hover: none)').matches;

if (isTouch && headlights) {
  gsap
    .timeline({ repeat: -1, repeatDelay: 8 })
    .to(headlights, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
    .to(headlights, {
      opacity: 0,
      duration: 0.4,
      delay: 0.8,
      ease: 'power2.in',
    });
}

const stats = document.querySelectorAll('.hero__stat');
gsap.to(stats, {
  opacity: 1,
  y: 0,
  scale: 1,

  duration: 0.7,

  ease: 'back.out(1.4)',

  stagger: 0.12,

  delay: 0.8,
});
const tl = gsap.timeline();

tl.from('.hero__badge', {
  opacity: 0,
  y: -20,
  duration: 0.5,
  ease: 'power2.out',
})
  .from(
    '.hero__title',
    {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
    },
    '-=0.2',
  )
  .from(
    '.hero__description',
    {
      opacity: 0,
      y: 25,
      duration: 0.5,
    },
    '-=0.3',
  )
  .from(
    '.hero__buttons',
    {
      opacity: 0,
      y: 20,
      duration: 0.5,
    },
    '-=0.2',
  )
  .from(
    '.hero__stat',
    {
      opacity: 0,
      y: 25,
      scale: 0.95,
      stagger: 0.12,
      duration: 0.6,
      ease: 'back.out(1.4)',
    },
    '-=0.1',
  );
