export function initReviewsExpand() {
    const track = document.getElementById('reviewsTrack');
    if (!track) {
        console.warn('Раскрытие отзывов: не найден трек');
        return null;
    }

    const cards = track.querySelectorAll('.reviews__card');
    const MAX_LINES = 4;

    function processReview(card) {
        const textElement = card.querySelector('.reviews__card-text');
        if (!textElement) return;

        const oldBtn = card.querySelector('.reviews__toggle-btn');
        if (oldBtn) oldBtn.remove();

        let cleanHTML = textElement.innerHTML;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cleanHTML;
        const oldEllipsis = tempDiv.querySelector('.reviews__ellipsis');
        if (oldEllipsis) oldEllipsis.remove();
        cleanHTML = tempDiv.innerHTML.trim();

        if (!textElement.dataset.fullHtml) {
            textElement.dataset.fullHtml = cleanHTML;
        }

        textElement.innerHTML = textElement.dataset.fullHtml;
        textElement.style.maxHeight = 'none';
        textElement.style.overflow = 'visible';

        const wrapper = document.createElement('div');
        const computedStyle = getComputedStyle(textElement);
        wrapper.style.cssText = `
            position: absolute;
            visibility: hidden;
            height: auto;
            width: ${textElement.offsetWidth || 300}px;
            font: ${computedStyle.font};
            line-height: ${computedStyle.lineHeight};
            padding: ${computedStyle.padding};
            word-break: break-word;
            box-sizing: border-box;
        `;
        wrapper.innerHTML = textElement.dataset.fullHtml;
        document.body.appendChild(wrapper);

        const lineHeight = parseFloat(computedStyle.lineHeight) || 24;
        const maxHeight = lineHeight * MAX_LINES;
        const fullHeight = wrapper.scrollHeight;
        const isLong = fullHeight > maxHeight + 2;

        wrapper.remove();

        textElement.innerHTML = textElement.dataset.fullHtml;

        if (isLong) {
            textElement.style.maxHeight = maxHeight + 'px';
            textElement.style.overflow = 'hidden';
            textElement.style.transition = 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

            const wrapperDiv = card.querySelector('.reviews__card-text-wrapper');
            if (!wrapperDiv) return;

            const oldBtn2 = wrapperDiv.querySelector('.reviews__toggle-btn');
            if (oldBtn2) oldBtn2.remove();
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'reviews__toggle-btn';
            toggleBtn.textContent = 'Читать полностью';

            let isExpanded = false;

            toggleBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                isExpanded = !isExpanded;
                
                if (isExpanded) {
                    textElement.style.maxHeight = fullHeight + 20 + 'px';
                    this.textContent = 'Скрыть';
                    card.classList.add('reviews__card--expanded');
                } else {
                    textElement.style.maxHeight = maxHeight + 'px';
                    this.textContent = 'Читать полностью';
                    card.classList.remove('reviews__card--expanded');
                }
            });

            wrapperDiv.appendChild(toggleBtn);
        } else {
            textElement.style.maxHeight = 'none';
            textElement.style.overflow = 'visible';
            textElement.style.transition = 'none';
        }
    }

    // Обрабатываем все карточки
    cards.forEach(processReview);

    // Функция пересчета
    function recalcAll() {
        cards.forEach((card) => {
            const btn = card.querySelector('.reviews__toggle-btn');
            if (btn) btn.remove();
            const textElement = card.querySelector('.reviews__card-text');
            if (textElement) {
                textElement.style.maxHeight = 'none';
                textElement.style.overflow = 'visible';
                textElement.style.transition = 'none';
                delete textElement.dataset.fullHtml;
            }
            card.classList.remove('reviews__card--expanded');
            processReview(card);
        });
    }

    // Пересчёт при ресайзе с debounce
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(recalcAll, 300);
    });

    // Пересчёт при изменении карусели (перелистывание)
    const observer = new MutationObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(recalcAll, 300);
    });

    observer.observe(track, {
        attributes: true,
        attributeFilter: ['style']
    });

    return {
        recalc: recalcAll
    };
}