import { highlightGREWords, seriesConfig, seriesContent } from './wordDictionary.js';
import { initializeContent } from './ui.js';
import { startLandingAnimation } from './animations.js';

function loadContent() {
  const app = document.getElementById('app');
  if (!app) {
    console.error('App container not found');
    return;
  }

  const hash = window.location.hash.substring(1);
  const currentPage = hash || 'index';

  // Update active menu item
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentPage}`) {
      link.classList.add('active');
    }
  });

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
  } else if (currentPage === 'about') {
    app.innerHTML = `
      <div class="container">
        <h1>about gre vocab with pop culture</h1>
        <p>learn gre vocabulary through popular tv series and movies.</p>
      </div>
    `;
  } else if (seriesConfig && seriesConfig.hasOwnProperty(currentPage)) {
    // Load the series page content
    app.innerHTML = `
      <div class="container">
        <h1 id="series-title">${seriesConfig[currentPage].title}</h1>
        <div id="content"></div>
      </div>
    `;
    loadSeriesContent(currentPage);
  } else {
    // 404 page
    app.innerHTML = '<h1>404 - page not found</h1>';
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
      <span>${seriesConfig[series].title.toLowerCase()}</span>
    `;
    seriesSelection.appendChild(button);
  }
}

function populateSeriesDropdown() {
  const dropdown = document.getElementById('series-dropdown');
  if (!dropdown) return;

  for (let series in seriesConfig) {
    const link = document.createElement('a');
    link.href = `#${series}`;
    link.textContent = seriesConfig[series].title.toLowerCase();
    dropdown.appendChild(link);
  }
}

function loadSeriesContent(series) {
  const contentDiv = document.getElementById('content');
  if (!contentDiv) return;

  if (seriesContent && seriesContent[series]) {
    const highlightedContent = seriesContent[series].map(paragraph => {
      const highlightedParagraph = highlightGREWords(paragraph, series);
      return `<p>${highlightedParagraph}</p>`;
    }).join('');
    
    contentDiv.innerHTML = highlightedContent;
    initializeContent();
  } else {
    contentDiv.innerHTML = '<p>Content not found for this series.</p>';
  }
}

export function initializeRouter() {
  // Populate series dropdown
  populateSeriesDropdown();

  // Initial load
  loadContent();

  // Handle navigation
  window.addEventListener('hashchange', loadContent);
}