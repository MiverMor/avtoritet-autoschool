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
    'assets/images/gallery/car4.jpg',
    'assets/images/gallery/car5.jpg',
    'assets/images/gallery/car6.jpg',
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

let carouselIndex = 0;
let carouselResizeTimer;

function renderGallery(type) {
  const images = galleryData[type];

  carouselIndex = 0;

  // Если фото больше трёх — показываем карусель.
  // Для офиса и автодрома с тремя фото оставляем сетку.
  const useCarousel = type === 'cars' && images.length > 3;

  if (!useCarousel) {
    galleryImages.innerHTML = images
      .map(
        (src) => `
          <div class="gallery__image">
            <img src="${src}" alt="">
          </div>
        `,
      )
      .join('');

    return;
  }

  galleryImages.innerHTML = `
    <div class="gallery__carousel">
      <div class="gallery__carousel-viewport">
        <div class="gallery__carousel-track">
          ${images
            .map(
              (src, index) => `
                <div class="gallery__image">
                  <img src="${src}" alt="Автомобиль автошколы, фото ${index + 1}" loading="lazy">
                </div>
              `,
            )
            .join('')}
        </div>
      </div>

      <div class="gallery__carousel-controls">
        <button
          class="gallery__arrow gallery__arrow--prev"
          type="button"
          aria-label="Предыдущие автомобили"
          disabled
        >
          &#8592;
        </button>

        <span class="gallery__counter">
          <span class="gallery__counter-current">1</span>
          /
          <span class="gallery__counter-total">${images.length}</span>
        </span>

        <button
          class="gallery__arrow gallery__arrow--next"
          type="button"
          aria-label="Следующие автомобили"
        >
          &#8594;
        </button>
      </div>
    </div>
  `;

  initGalleryCarousel();
}

let updateActiveCarousel = null;

function initGalleryCarousel() {
  const carousel = galleryImages.querySelector('.gallery__carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.gallery__carousel-track');
  const cards = [...track.querySelectorAll('.gallery__image')];
  const prev = carousel.querySelector('.gallery__arrow--prev');
  const next = carousel.querySelector('.gallery__arrow--next');
  const counter = carousel.querySelector('.gallery__counter-current');

  function getVisibleCount() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);

    carouselIndex = Math.min(carouselIndex, maxIndex);

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    track.style.transform = `translateX(-${carouselIndex * (cardWidth + gap)}px)`;

    prev.disabled = carouselIndex === 0;
    next.disabled = carouselIndex >= maxIndex;

    counter.textContent = carouselIndex + 1;
  }
  updateActiveCarousel = updateCarousel;

  prev.addEventListener('click', () => {
    carouselIndex = Math.max(0, carouselIndex - 1);
    updateCarousel();
  });

  next.addEventListener('click', () => {
    const maxIndex = cards.length - getVisibleCount();
    carouselIndex = Math.min(maxIndex, carouselIndex + 1);
    updateCarousel();
  });

  updateCarousel();

  // Сохраняем актуальное положение при изменении ширины окна.
  function handleGalleryCarouselResize() {
    const carousel = galleryImages.querySelector('.gallery__carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.gallery__carousel-track');
    const cards = [...track.querySelectorAll('.gallery__image')];
    const visibleCount =
      window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;

    carouselIndex = Math.min(
      carouselIndex,
      Math.max(0, cards.length - visibleCount),
    );

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    track.style.transform = `translateX(-${carouselIndex * (cardWidth + gap)}px)`;

    carousel.querySelector('.gallery__arrow--prev').disabled =
      carouselIndex === 0;

    carousel.querySelector('.gallery__arrow--next').disabled =
      carouselIndex >= cards.length - visibleCount;

    carousel.querySelector('.gallery__counter-current').textContent =
      carouselIndex + 1;
  }
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
function handleGalleryCarouselResize() {
  if (updateActiveCarousel) {
    updateActiveCarousel();
  }
}
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    initGalleryScrollAnimation();
    handleGalleryCarouselResize();
  }, 200);
});

// После полной загрузки
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
