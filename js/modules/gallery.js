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
  const prev = carousel.querySelector('.gallery__arrow--prev');
  const next = carousel.querySelector('.gallery__arrow--next');
  const counter = carousel.querySelector('.gallery__counter-current');

  // Оригинальные карточки — без копий.
  const originalCards = [...track.querySelectorAll('.gallery__image')];
  const originalCount = originalCards.length;

  if (originalCount <= 1) return;

  // Копируем по три карточки в начало и конец.
  // Трёх достаточно для всех наших размеров: 1, 2 или 3 карточки на экране.
  const cloneCount = 3;

  const prependClones = originalCards.slice(-cloneCount).map((card) => {
    const clone = card.cloneNode(true);
    clone.dataset.carouselClone = 'true';
    clone.setAttribute('aria-hidden', 'true');
    return clone;
  });

  const appendClones = originalCards.slice(0, cloneCount).map((card) => {
    const clone = card.cloneNode(true);
    clone.dataset.carouselClone = 'true';
    clone.setAttribute('aria-hidden', 'true');
    return clone;
  });

  prependClones.forEach((clone) => track.prepend(clone));
  appendClones.forEach((clone) => track.append(clone));

  let carouselIndex = cloneCount;

  function updateCounter() {
    // Счётчик показывает только оригинальные фотографии: 1 / 6, 2 / 6...
    const realIndex =
      (((carouselIndex - cloneCount) % originalCount) + originalCount) %
      originalCount;

    counter.textContent = realIndex + 1;
  }

  function updateCarousel(animate = true) {
    const cards = [...track.querySelectorAll('.gallery__image')];
    if (!cards.length) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = carouselIndex * (cardWidth + gap);

    if (!animate) {
      track.style.transition = 'none';
    }

    track.style.transform = `translate3d(-${offset}px, 0, 0)`;

    if (!animate) {
      // Применяем позицию без анимации перед возвратом переходов.
      track.offsetWidth;
      track.style.transition = '';
    }

    updateCounter();

    // В бесконечной карусели обе стрелки всегда доступны.
    prev.disabled = false;
    next.disabled = false;
  }

  function moveCarousel(direction) {
    carouselIndex += direction;
    updateCarousel();
  }

  prev.addEventListener('click', () => moveCarousel(-1));
  next.addEventListener('click', () => moveCarousel(1));

  // Когда доходим до копии, незаметно возвращаемся к оригиналу.
  track.addEventListener('transitionend', (event) => {
    if (event.target !== track || event.propertyName !== 'transform') return;

    // Перешли на копию первой карточки в конце.
    if (carouselIndex >= cloneCount + originalCount) {
      carouselIndex = cloneCount;
      updateCarousel(false);
    }

    // Перешли на копию последней карточки в начале.
    if (carouselIndex < cloneCount) {
      carouselIndex = cloneCount + originalCount - 1;
      updateCarousel(false);
    }
  });

  updateCarousel(false);

  // Позволяем общему resize-обработчику пересчитывать позицию.
  updateActiveCarousel = () => {
    updateCarousel(false);
  };
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
