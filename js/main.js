import { initScrollSpy } from './modules/scroll-spy.js';
import { initStickyHeader } from './modules/sticky-header.js';
import { initBurger } from './modules/burger.js';
import './modules/hero.js';
import './modules/steps.js';
import './modules/gallery.js';
import './modules/promotions.js';
import { initReviewsCarousel } from './modules/reviews-carousel.js';
import { initReviewsExpand } from './modules/reviews-expand.js';
import './modules/prices.js';
import './modules/contacts.js';
import './modules/contact-form.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initStickyHeader();
  initBurger();
  initReviewsCarousel();
  initReviewsExpand();
});
