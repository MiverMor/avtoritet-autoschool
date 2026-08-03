gsap.registerPlugin(ScrollTrigger);

// ========================================
// Настройки
// ========================================

const isDesktop = () => window.innerWidth >= 992;
let currentAnimation;
let resizeTimer;

// ========================================
// Анимация при скролле
// ========================================

function initGalleryScrollAnimation() {
  // Удаляем только триггеры галереи
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.trigger?.classList?.contains('gallery__images') ||
      trigger.trigger?.classList?.contains('gallery__image')
    ) {
      trigger.kill();
    }
  });

  // Сбрасываем стили
  gsap.set('.gallery__image', { clearProps: 'all' });

  if (!isDesktop()) {
    ScrollTrigger.refresh();
    return;
  }

  gsap.from('.gallery__image', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',

    scrollTrigger: {
      trigger: '.gallery__images',
      start: 'top 75%',
      end: 'bottom 20%',
      toggleActions: 'play reverse play reverse',
      invalidateOnRefresh: true,
    },

    clearProps: 'transform,opacity',
  });

  ScrollTrigger.refresh();
}

initGalleryScrollAnimation();

// ========================================
// Данные галереи
// ========================================

const galleryData = {
  office: [
    'assets/images/gallery/office1.jpg',
    'assets/images/gallery/office2.jpg',
    'assets/images/gallery/office3.jpg',
  ],

  cars: [
    'assets/images/gallery/car1.jpg',
    'assets/images/gallery/car2.jpg',
    'assets/images/gallery/car3.jpg',
  ],

  autodrome: [
    'assets/images/gallery/autodrom1.jpg',
    'assets/images/gallery/autodrom2.jpg',
    'assets/images/gallery/autodrom3.jpg',
  ],
};

// ========================================
// Рендер
// ========================================

const tabs = document.querySelectorAll('.gallery__tab');
const galleryImages = document.querySelector('.gallery__images');

function renderGallery(type) {
  galleryImages.innerHTML = galleryData[type]
    .map(
      (src) => `
        <div class="gallery__image">
          <img src="${src}" alt="">
        </div>
      `,
    )
    .join('');
}

// ========================================
// Переключение вкладок
// ========================================

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('gallery__tab--active')) return;

    tabs.forEach((btn) => btn.classList.remove('gallery__tab--active'));
    tab.classList.add('gallery__tab--active');

    const type = tab.dataset.gallery;

    if (currentAnimation) {
      currentAnimation.kill();
    }

    const oldCards = gsap.utils.toArray('.gallery__image');

    // МОБИЛКА / ПЛАНШЕТ
    if (!isDesktop()) {
      currentAnimation = gsap.to(oldCards, {
        opacity: 0,
        duration: 0.18,
        stagger: 0.03,
        ease: 'power1.out',

        onComplete: () => {
          renderGallery(type);

          const newCards = gsap.utils.toArray('.gallery__image');

          currentAnimation = gsap.fromTo(
            newCards,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.28,
              stagger: 0.05,
              ease: 'power1.out',
              clearProps: 'opacity',
            },
          );
        },
      });

      return;
    }

    // ДЕСКТОП
    currentAnimation = gsap.to(oldCards, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',

      onComplete: () => {
        renderGallery(type);

        // Переинициализируем scroll-анимацию
        initGalleryScrollAnimation();
      },
    });
  });
});

// ========================================
// Resize
// ========================================

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    initGalleryScrollAnimation();
  }, 200);
});

// После полной загрузки
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
