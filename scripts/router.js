import { highlightGREWords, seriesConfig, seriesContent  } from './words.js';
import { initializeContent, setSeriesBackground } from './ui.js';
import { startLandingAnimation } from './animations.js';


function loadContent() {
  const app = document.getElementById('app');
  if (!app) {
    console.error('App container not found');
    return;
  }

  const hash = window.location.hash.substring(1);
  const currentPage = hash || 'index';

  if (currentPage === 'index') {
    // Load the landing page content
    app.innerHTML = `
      <div class="landing-page">
        <div class="container">
          <div id="animated-text"></div>
          <div class="series-selection">
            <!-- This will be populated dynamically -->
          </div>
        </div>
      </div>
    `;
    populateSeriesButtons();
    startLandingAnimation();
  } else if (seriesConfig && seriesConfig.hasOwnProperty(currentPage)) {
    // Load the series page content
    app.innerHTML = `
      <div class="container">
        <h1 id="series-title">${seriesConfig[currentPage].title}</h1>
        <div id="content"></div>
        <a href="#" class="back-button">Back to Series Selection</a>
      </div>
    `;
    loadSeriesContent(currentPage);
    setSeriesBackground(currentPage);
  } else {
    // 404 page
    app.innerHTML = '<h1>404 - Page Not Found</h1>';
  }
}

function populateSeriesButtons() {
  const seriesSelection = document.querySelector('.series-selection');
  if (!seriesSelection) return;

  for (let series in seriesConfig) {
    const button = document.createElement('a');
    button.href = `#${series}`;
    button.className = 'series-button';
    button.innerHTML = `
      <i class="${seriesConfig[series].icon}"></i>
      <span>${seriesConfig[series].title}</span>
    `;
    seriesSelection.appendChild(button);
  }
}

function loadSeriesContent(series) {
  const contentDiv = document.getElementById('content');
  if (!contentDiv) return;

  if (seriesContent && seriesContent[series]) {
    contentDiv.innerHTML = highlightGREWords(seriesContent[series].map(paragraph => `<p>${paragraph}</p>`).join(''));
    initializeContent();
  } else {
    contentDiv.innerHTML = '<p>Content not found for this series.</p>';
  }
}

export function initializeRouter() {
    // Initial load
    loadContent();
    console.log('hihi')
  
    // Handle navigation
    window.addEventListener('hashchange', loadContent);
  }
  