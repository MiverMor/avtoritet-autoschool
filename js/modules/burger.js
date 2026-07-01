export function initBurger() {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.header__burger');
    const overlay = document.querySelector('.overlay');

    if (!header || !burger || !overlay) return;

    const openMenu = () => {
        header.classList.add('menu-open');
        overlay.classList.add('active');
        document.body.classList.add('body-lock');

        burger.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        header.classList.remove('menu-open');
        overlay.classList.remove('active');
        document.body.classList.remove('body-lock');

        burger.setAttribute('aria-expanded', 'false');
    };

    burger.addEventListener('click', () => {
        if (header.classList.contains('menu-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    document.querySelectorAll('.header__link').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
}