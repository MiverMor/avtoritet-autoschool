import { initScrollSpy } from './modules/scroll-spy.js';
import { initStickyHeader } from './modules/sticky-header.js';
import { initBurger } from './modules/burger.js';
import './modules/hero.js';
import './modules/steps.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initStickyHeader();
  initBurger();
});
