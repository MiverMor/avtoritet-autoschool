// ============================================
// МОДУЛЬ: Карусель отзывов
// ============================================

export function initReviewsCarousel() {
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('reviewsPrev');
    const nextBtn = document.getElementById('reviewsNext');
    
    if (!track || !prevBtn || !nextBtn) {
        console.warn('Карусель отзывов: не найдены элементы');
        return null;
    }

    let currentPage = 0;
    const totalCards = track.children.length;

    // ===== ОПРЕДЕЛЯЕМ КОЛИЧЕСТВО КАРТОЧЕК В ЗАВИСИМОСТИ ОТ ШИРИНЫ =====
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;        // Телефоны
        if (width < 992) return 2;        // Планшеты
        if (width < 1200) return 2;       // Маленькие ноутбуки
        return 3;                          // Десктопы
    }

    let cardsPerView = getCardsPerView();
    let totalPages = Math.ceil(totalCards / cardsPerView);

    function updateCarousel() {
        const firstCard = track.children[0];
        if (!firstCard) return;
        
        // Пересчитываем количество страниц
        cardsPerView = getCardsPerView();
        totalPages = Math.ceil(totalCards / cardsPerView);
        
        // Если текущая страница выходит за пределы — сбрасываем на последнюю
        if (currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }
        if (currentPage < 0) {
            currentPage = 0;
        }
        
        const cardWidth = firstCard.offsetWidth + 30; // 30 — это gap
        const offset = currentPage * cardsPerView * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;
        
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= totalPages - 1;
    }

    // ===== ЛИСТАЕМ НАЗАД =====
    prevBtn.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            updateCarousel();
        }
    });

    // ===== ЛИСТАЕМ ВПЕРЕД =====
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateCarousel();
        }
    });

    // ===== СВАЙП ДЛЯ МОБИЛЬНЫХ =====
    const carousel = document.getElementById('reviewsCarousel');
    if (carousel) {
        let startX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        carousel.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentPage < totalPages - 1) {
                    currentPage++;
                    updateCarousel();
                } else if (diff < 0 && currentPage > 0) {
                    currentPage--;
                    updateCarousel();
                }
            }
        }, { passive: true });
    }

    // ===== ОБНОВЛЯЕМ ПРИ ИЗМЕНЕНИИ РАЗМЕРА =====
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Сбрасываем на первую страницу при смене разрешения
            // чтобы избежать пустых страниц
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                currentPage = 0;
            }
            updateCarousel();
        }, 250);
    });

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    setTimeout(updateCarousel, 100);

    return {
        goToPage: (page) => {
            if (page >= 0 && page < totalPages) {
                currentPage = page;
                updateCarousel();
            }
        },
        next: () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateCarousel();
            }
        },
        prev: () => {
            if (currentPage > 0) {
                currentPage--;
                updateCarousel();
            }
        },
        // Для отладки
        getState: () => ({
            currentPage,
            totalPages,
            cardsPerView,
            totalCards
        })
    };
}