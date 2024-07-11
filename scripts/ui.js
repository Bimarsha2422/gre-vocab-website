import { saveFeedback, getAverageRating } from './storage.js';
import { highlightGREWords, wordDictionary, seriesConfig} from './words.js';

export function initializeUI() {
  setInitialTheme();
  
  const lightbulbToggle = document.getElementById('lightbulb');
  if (lightbulbToggle) {
    lightbulbToggle.addEventListener('click', toggleDarkMode);
  }

  initializeContent();
}


export function initializeContent() {
  const contentDiv = document.getElementById('content');
  if (!contentDiv) return;

  document.querySelectorAll('.gre-word').forEach(word => {
    word.addEventListener('mouseover', (e) => {
      const rect = word.getBoundingClientRect();
      createTooltip(word.dataset.word, wordDictionary[word.dataset.word].meaning, rect);
    });

    word.addEventListener('mouseout', () => {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });

    word.addEventListener('click', (e) => {
      e.preventDefault();
      const wordData = wordDictionary[word.dataset.word];
      if (wordData) {
        createInfoWindow(word.dataset.word, wordData);
      }
    });
  });
}

function createTooltip(word, meaning, rect) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = meaning;
  
  tooltip.style.left = `${rect.left}px`;
  tooltip.style.top = `${rect.bottom + window.scrollY}px`;
  
  document.body.appendChild(tooltip);
  tooltip.style.display = 'block';
}

function createInfoWindow(word, info) {
  const infoWindow = document.createElement('div');
  infoWindow.className = 'info-window';
  
  const averageRating = getAverageRating(word);
  
  infoWindow.innerHTML = `
    <div class="info-header">
      <h2>${word}</h2>
      <span class="close-btn">&#10005;</span>
    </div>
    <p><strong>Meaning:</strong> ${info.meaning}</p>
    <p><strong>Usage:</strong> ${info.usage}</p>
    <p><strong>Root:</strong> ${info.root}</p>
    <p><strong>Synonyms:</strong> ${info.synonyms.join(', ')}</p>
    <p>How helpful was this information?</p>
    <div class="star-rating" data-word="${word}">
      ${createStars()}
    </div>
    <p class="average-rating">Average rating: ${averageRating.toFixed(1)}</p>
  `;
  document.body.appendChild(infoWindow);

  setupInfoWindowEventListeners(infoWindow, word);
}

function setupInfoWindowEventListeners(infoWindow, word) {
  // Close button functionality
  const closeBtn = infoWindow.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => infoWindow.remove());

  // Close when clicking outside
  document.addEventListener('click', function closeOnClickOutside(e) {
    if (!infoWindow.contains(e.target) && e.target !== document.querySelector('.gre-word:hover')) {
      infoWindow.remove();
      document.removeEventListener('click', closeOnClickOutside);
    }
  });

  // Star rating functionality
  const stars = infoWindow.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.value);
      saveFeedback(word, rating);
      updateStarDisplay(star.parentElement, rating);
      updateAverageRating(infoWindow, word);
    });
  });
}

function createStars() {
  return Array.from({length: 5}, (_, i) => 
    `<span class="star" data-value="${i + 1}">&#9734;</span>`
  ).join('');
}

function updateStarDisplay(container, rating) {
  const stars = container.querySelectorAll('.star');
  stars.forEach((star, index) => {
    star.innerHTML = index < rating ? '&#9733;' : '&#9734;';
  });
}

function updateAverageRating(infoWindow, word) {
  const averageRating = getAverageRating(word);
  const averageElement = infoWindow.querySelector('.average-rating');
  averageElement.textContent = `Average rating: ${averageRating.toFixed(1)}`;
}

function setInitialTheme() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
  updateLightbulbIcon(isDarkMode);
}

function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  updateLightbulbIcon(isDarkMode);
}

function updateLightbulbIcon(isDarkMode) {
  const lightbulbIcon = document.querySelector('#lightbulb i');
  if (lightbulbIcon) {
    lightbulbIcon.classList.toggle('glow', !isDarkMode);
  }
}