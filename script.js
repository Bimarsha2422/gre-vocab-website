// Get the current page name from the URL
function getCurrentPage() {
    return window.location.pathname.split('/').pop().split('.')[0];
}

// Function to create and append a tooltip
function createTooltip(word, meaning, rect) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = meaning;
    
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    
    document.body.appendChild(tooltip);
    tooltip.style.display = 'block';
}

// Function to create and append an info window
function createInfoWindow(word, info) {
    const infoWindow = document.createElement('div');
    infoWindow.className = 'info-window';
    
    // Fetch the average rating
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

// Function to create stars for rating
function createStars() {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="star" data-value="${i}">&#9734;</span>`;
    }
    return starsHTML;
}

// Function to update the star display based on rating
function updateStarDisplay(container, rating) {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.innerHTML = index < rating ? '&#9733;' : '&#9734;';
    });
}

// Function to save feedback to local storage
function saveFeedback(word, rating) {
    let feedback = JSON.parse(localStorage.getItem('greFeedback')) || {};
    if (!Array.isArray(feedback[word])) {
        feedback[word] = [];
    }
    feedback[word].push(rating);
    localStorage.setItem('greFeedback', JSON.stringify(feedback));
}

// Function to get the average rating of a word
function getAverageRating(word) {
    const feedback = JSON.parse(localStorage.getItem('greFeedback')) || {};
    const ratings = Array.isArray(feedback[word]) ? feedback[word] : [];
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
}

// Function to update the average rating display
function updateAverageRating(infoWindow, word) {
    const averageRating = getAverageRating(word);
    const averageElement = infoWindow.querySelector('.average-rating');
    averageElement.textContent = `Average rating: ${averageRating.toFixed(1)}`;
}

// Function to highlight GRE words in the text
function highlightGREWords(text) {
    return text.replace(/\b(\w+)\b/g, (match, word) => {
        if (wordDictionary.hasOwnProperty(word.toLowerCase())) {
            return `<span class="gre-word" data-word="${word.toLowerCase()}">${word}</span>`;
        }
        return match;
    });
}

// Function to initialize the page content
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

// Function to set the initial theme based on saved preference
function setInitialTheme() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const checkbox = document.getElementById('checkbox');
        if (checkbox) {
            checkbox.checked = true;
        }
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Function to create a particle for animation
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = 15 + Math.random() * 10 + 's';
    particle.style.width = particle.style.height = Math.random() * 5 + 5 + 'px';
    return particle;
}

// Function to create a V shape for animation
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

// Function to setup the Compound V animation
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

  function setSeriesBackground(seriesKey) {
    const config = seriesConfig[seriesKey];
    const container = document.querySelector('.series-background-container'); // Adjust selector as needed

    if (config.backgroundImages) {
        container.style.backgroundImage = config.backgroundImages.map(img => `url('${img}')`).join(', ');
        container.style.backgroundPosition = config.backgroundPositions.join(', ');
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundSize = 'contain'; // or 'cover', depending on your preference
    } else {
        container.style.backgroundImage = 'none';
    }
}

// Event listener for DOM content loaded to initialize features
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

    setInitialTheme();
    initializeContent();
    setupCompoundV();
});

window.initializeContent = initializeContent;