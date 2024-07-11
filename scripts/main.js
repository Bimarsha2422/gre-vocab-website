import { initializeUI } from './ui.js';
import { initializeRouter } from './router.js';
import { setupAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeUI();
  initializeRouter();
  setupAnimations();
}); 