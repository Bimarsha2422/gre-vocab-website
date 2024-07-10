// Text content
const paragraphs = [
    "\"The Boys\" is anything but a humdrum superhero show. It's a wild ride that'll make you question every deified cape-wearer you've ever admired.",
    "Picture this: In a world where superheroes abound, they're not the benign saviors we expect. Nope, they're more likely to be avaricious celebs with a proclivity for bad behavior. The show's tone? Far from congenial - it's a caustic take on power and fame.",
    "Enter Billy Butcher, the show's loquacious anti-hero with a misanthropic streak a mile wide. He's got a bone to pick with supes, especially Homelander, the poster boy for everything wrong with superhero culture."
];

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

function createStars() {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="star" data-value="${i}">&#9734;</span>`;
    }
    return starsHTML;
}

function updateStarDisplay(container, rating) {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.innerHTML = index < rating ? '&#9733;' : '&#9734;';
    });
}

function saveFeedback(word, rating) {
    let feedback = JSON.parse(localStorage.getItem('greFeedback')) || {};
    if (!Array.isArray(feedback[word])) {
        feedback[word] = [];
    }
    feedback[word].push(rating);
    localStorage.setItem('greFeedback', JSON.stringify(feedback));
    console.log(`Feedback saved for ${word}: ${rating}`);
}

function getAverageRating(word) {
    const feedback = JSON.parse(localStorage.getItem('greFeedback')) || {};
    const ratings = Array.isArray(feedback[word]) ? feedback[word] : [];
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
}

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
    if (!contentDiv) {
        return;
    }
    
    contentDiv.innerHTML = paragraphs.map(para => `<p>${highlightGREWords(para)}</p>`).join('');

    // Add event listeners to highlighted words
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

        word.addEventListener('click', () => {
            createInfoWindow(word.dataset.word, wordDictionary[word.dataset.word]);
        });
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Function to set the initial theme
function setInitialTheme() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('checkbox').checked = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    toggleSwitch.addEventListener('change', toggleDarkMode, false);
    
    setInitialTheme();
    initializeContent();
    setupCompoundV();
});

// Event listener for dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    initializeContent();
});

// Add this to the end of script.js

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = 15 + Math.random() * 10 + 's';
    particle.style.width = particle.style.height = Math.random() * 5 + 5 + 'px';
    return particle;
}

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

// Call setupCompoundV when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Existing code
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    initializeContent();

    // New code for Compound V animation
    setupCompoundV();
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Update the event listener for dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Check if dark mode was previously enabled
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
        
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    initializeContent();
    setupCompoundV();
});