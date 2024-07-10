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
        if (typeof window.startLandingAnimation === 'function') {
            window.startLandingAnimation();
        } else {
            console.error('startLandingAnimation function not found. Make sure landing-script.js is loaded.');
        }
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

// Initial load
window.addEventListener('DOMContentLoaded', loadContent);

// Handle navigation
window.addEventListener('hashchange', loadContent);

// Ensure seriesConfig and seriesContent are available
if (typeof seriesConfig === 'undefined' || typeof seriesContent === 'undefined') {
    console.error('seriesConfig or seriesContent is not defined. Make sure words.js is loaded correctly.');
}