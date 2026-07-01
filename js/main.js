import { initScrollSpy } from './modules/scroll-spy.js';
import { initStickyHeader } from './modules/sticky-header.js';

document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initStickyHeader();
});
