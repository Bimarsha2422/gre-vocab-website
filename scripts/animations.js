export function setupAnimations() {
    setupCompoundV();
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

export function startLandingAnimation() {
const phrases = [
    "Master GRE Vocab",
    "Discover Words in Stories",
    "Learn. Enjoy. Excel."
];

async function animateText() {
    const textElement = document.getElementById('animated-text');
    if (!textElement) {
    console.error('animated-text element not found');
    return;
    }
    
    while (true) {
    for (const phrase of phrases) {
        const phraseElement = document.createElement('div');
        phraseElement.classList.add('typing-text');
        textElement.appendChild(phraseElement);
        
        await typeText(phrase, phraseElement);
        await sleep(1500); // Wait before erasing
        await eraseText(phraseElement);
        
        textElement.removeChild(phraseElement);
    }
    }
}

animateText();
}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, element) {
for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await sleep(50); // Adjust typing speed here
}
}

async function eraseText(element) {
let text = element.textContent;
while (text.length > 0) {
    text = text.slice(0, -1);
    element.textContent = text;
    await sleep(40); // Adjust erasing speed here
}
}