/**
 * GRE Vocabulary Learning Tool
 * 
 * This script provides functionality for a GRE vocabulary learning website.
 * It includes features such as word highlighting, tooltips, info windows,
 * user feedback, dark mode, and animations.
 */

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get the current page name from the URL.
 * @returns {string} The current page name.
 */
function getCurrentPage() {
    return window.location.pathname.split('/').pop().split('.')[0];
}

/**
 * Create stars for rating display.
 * @returns {string} HTML string containing star elements.
 */
function createStars() {
    return Array.from({length: 5}, (_, i) => 
        `<span class="star" data-value="${i + 1}">&#9734;</span>`
    ).join('');
}

// =============================================================================
// Local Storage Handling
// =============================================================================

/**
 * Save user feedback to local storage.
 * @param {string} word - The word being rated.
 * @param {number} rating - The user's rating (1-5).
 */
function saveFeedback(word, rating) {
    let feedback = JSON.parse(localStorage.getItem('greFeedback')) || {};
    if (!Array.isArray(feedback[word])) {
        feedback[word] = [];
    }
    feedback[word].push(rating);
    localStorage.setItem('greFeedback', JSON.stringify(feedback));
}

/**
 * Get the average rating for a word.
 * @param {string} word - The word to get the average rating for.
 * @returns {number} The average rating (0-5).
 */
function getAverageRating(word) {
    const feedback = JSON.parse(localStorage.getItem('greFeedback')) || {};
    const ratings = Array.isArray(feedback[word]) ? feedback[word] : [];
    if (ratings.length === 0) return 0;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

// =============================================================================
// UI Element Creation
// =============================================================================

/**
 * Create and append a tooltip to the body.
 * @param {string} word - The word to display in the tooltip.
 * @param {string} meaning - The meaning of the word.
 * @param {DOMRect} rect - The bounding rectangle of the target element.
 */
function createTooltip(word, meaning, rect) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = meaning;
    
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    
    document.body.appendChild(tooltip);
    tooltip.style.display = 'block';
}

/**
 * Create and append an info window to the body.
 * @param {string} word - The word to display information for.
 * @param {Object} info - The word information object.
 */
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

/**
 * Set up event listeners for the info window.
 * @param {HTMLElement} infoWindow - The info window element.
 * @param {string} word - The word associated with the info window.
 */
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

// =============================================================================
// UI Updates
// =============================================================================

/**
 * Update the star display based on the given rating.
 * @param {HTMLElement} container - The container of the stars.
 * @param {number} rating - The rating to display (1-5).
 */
function updateStarDisplay(container, rating) {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.innerHTML = index < rating ? '&#9733;' : '&#9734;';
    });
}

/**
 * Update the average rating display in the info window.
 * @param {HTMLElement} infoWindow - The info window element.
 * @param {string} word - The word to update the rating for.
 */
function updateAverageRating(infoWindow, word) {
    const averageRating = getAverageRating(word);
    const averageElement = infoWindow.querySelector('.average-rating');
    averageElement.textContent = `Average rating: ${averageRating.toFixed(1)}`;
}

// =============================================================================
// Word Highlighting and Interaction
// =============================================================================

/**
 * Highlight GRE words in the given text.
 * @param {string} text - The text to process.
 * @returns {string} The processed text with GRE words highlighted.
 */
function highlightGREWords(text) {
    return text.replace(/\b(\w+)\b/g, (match, word) => {
        if (wordDictionary.hasOwnProperty(word.toLowerCase())) {
            return `<span class="gre-word" data-word="${word.toLowerCase()}">${word}</span>`;
        }
        return match;
    });
}

/**
 * Initialize the page content by setting up event listeners for GRE words.
 */
function initializeContent() {
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

// =============================================================================
// Theme Handling
// =============================================================================

/**
 * Set the initial theme based on the saved preference.
 */
function setInitialTheme() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const checkbox = document.getElementById('checkbox');
        if (checkbox) {
            checkbox.checked = true;
        }
    }
}

/**
 * Toggle dark mode on and off.
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

/**
 * Add the dark mode toggle switch to the page.
 */
function addDarkModeToggle() {
    const toggleHtml = `
      <div class="theme-switch-wrapper">
        <label class="theme-switch" for="checkbox">
          <input type="checkbox" id="checkbox" />
          <div class="slider round">
            <i class="fas fa-sun slider-icon light-icon"></i>
            <i class="fas fa-moon slider-icon dark-icon"></i>
          </div>
        </label>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', toggleHtml);
}

// =============================================================================
// Animation Functions
// =============================================================================

/**
 * Create a particle element for animation.
 * @returns {HTMLElement} The created particle element.
 */
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = 15 + Math.random() * 10 + 's';
    particle.style.width = particle.style.height = Math.random() * 5 + 5 + 'px';
    return particle;
}

/**
 * Create a V shape element for animation.
 * @returns {HTMLElement} The created V shape container element.
 */
function createVShape() {
    const vContainer = document.createElement('div');
    vContainer.style.left = Math.random() * 80 + 10 + 'vw';
    vContainer.style.top = '100vh';
    vContainer.style.position = 'absolute';

    const leftLine = document.createElement('div');
    leftLine.classList.add('v-shape');
    leftLine.style.height = '100px';
    leftLine.style.transform = 'rotate(-30deg)';

    const rightLine = document.createElement('div');
    rightLine.classList.add('v-shape');
    rightLine.style.height = '100px';
    rightLine.style.transform = 'rotate(30deg)';

    vContainer.appendChild(leftLine);
    vContainer.appendChild(rightLine);

    return vContainer;
}

/**
 * Set up the Compound V animation.
 */
function setupCompoundV() {
    const container = document.createElement('div');
    container.classList.add('compound-v-container');
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        container.appendChild(createParticle());
    }

    setInterval(() => {
        const vShape = createVShape();
        container.appendChild(vShape);
        setTimeout(() => {
            vShape.remove();
        }, 10000);
    }, 15000);
}

// =============================================================================
// Series-specific Functions
// =============================================================================

/**
 * Set the background for a specific series.
 * @param {string} seriesKey - The key of the series to set the background for.
 */
function setSeriesBackground(seriesKey) {
    const config = seriesConfig[seriesKey];
    const container = document.querySelector('.series-background-container');

    if (config.backgroundImages) {
        container.style.backgroundImage = config.backgroundImages.map(img => `url('${img}')`).join(', ');
        container.style.backgroundPosition = config.backgroundPositions.join(', ');
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundSize = 'contain';
    } else {
        container.style.backgroundImage = 'none';
    }
}

// =============================================================================
// Initialization
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    addDarkModeToggle();
    setInitialTheme();
    
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', toggleDarkMode, false);
    }

    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    initializeContent();
    setupCompoundV();
});

// Make initializeContent globally available for use in other scripts
window.initializeContent = initializeContent;