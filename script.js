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
function createInfoWindow(word, info) {
    const infoWindow = document.createElement('div');
    infoWindow.className = 'info-window';
    
    infoWindow.innerHTML = `
        <div class="info-header">
            <h2>${word}</h2>
            <span class="close-btn">&#10005;</span>
        </div>
        <p><strong>Meaning:</strong> ${info.meaning}</p>
        <p><strong>Usage:</strong> ${info.usage}</p>
        <p><strong>Root:</strong> ${info.root}</p>
        <p><strong>Synonyms:</strong> ${info.synonyms.join(', ')}</p>
    `;
    document.body.appendChild(infoWindow);

    const closeBtn = infoWindow.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => infoWindow.remove());

    document.addEventListener('click', function closeOnClickOutside(e) {
        if (!infoWindow.contains(e.target) && e.target !== document.querySelector('.gre-word:hover')) {
            infoWindow.remove();
            document.removeEventListener('click', closeOnClickOutside);
        }
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

function highlightGREWords(text) {
    return text.replace(/\b(\w+)\b/g, (match, word) => {
        if (wordDictionary.hasOwnProperty(word.toLowerCase())) {
            return `<span class="gre-word" data-word="${word.toLowerCase()}">${word}</span>`;
        }
        return match;
    });
}
function initializeContent() {
    const contentDiv = document.getElementById('content');
    if (!contentDiv) return;

    document.querySelectorAll('.gre-word').forEach(word => {
        word.addEventListener('click', (e) => {
            e.preventDefault();
            const wordData = wordDictionary[word.dataset.word];
            if (wordData) {
                createInfoWindow(word.dataset.word, wordData);
            }
        });
    });
}


function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}


function setInitialTheme() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    const checkbox = document.getElementById('checkbox');
    if (checkbox) {
        checkbox.checked = document.body.classList.contains('dark-mode');
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', toggleDarkMode, false);
        setInitialTheme();
    }
    
    initializeContent();
    setupCompoundV();
});

window.initializeContent = initializeContent;

