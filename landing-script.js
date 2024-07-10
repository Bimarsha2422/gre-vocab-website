const phrases = [
    "Master GRE Vocab",
    "Through Pop Culture",
    "Learn. Enjoy. Excel."
];

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
        await sleep(30); // Adjust erasing speed here
    }
}

async function animateText() {
    const textElement = document.getElementById('animated-text');
    
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

document.addEventListener('DOMContentLoaded', animateText);