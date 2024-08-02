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
        <h1>About the project</h1>
        <p>Hi there,</p>
        <p>I'm Bimarsha, and I'm excited to share this project with you. I started it in my free time because I was struggling to remember GRE vocabulary. As I created the content and reviewed the website, I found that I learned the words quite well, and I hope you will too.</p>
        <p>Here's how it works: The texts on this site correspond to the Gregmat word sets. As you read, you'll see some words highlighted. The goal is for you to encounter these words in context and try to guess their meanings or get a feel for how they're used. When you hover over or click on a word to see its definition, hopefully it'll match your intuition. This process of reading, guessing, and confirming can help you learn the word in a way that sticks.</p>
        <p>All the content, including word meanings and texts, is generated using Large Language Models. While this approach allows for a wide range of engaging content, it's important to note that the word meanings may not always be perfect. I'm continuously working on refining the accuracy of the information provided.</p>
        <p>Please note that this website is still in its early stages. I have a few samples available to gather feedback, and I'm actively working on improving and expanding the content.</p>
        <p>I plan to make the code for this project public. My goal is to make it easy for users to add their own content based on their preferences. Ideally, you should be able to add a text file containing your essay and some basic config info, and the website will automatically adjust to include it with all the features.</p>
        <p>I'm really open to any sort of suggestions or feedback. This project aims to make learning GRE vocabulary easier and more engaging. Your input will help shape the future of this tool.</p>
        <p>Thanks for visiting, and happy learning!</p>
        <p>Bimarsha</p>
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