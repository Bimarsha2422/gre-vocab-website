export function saveFeedback(word, rating) {
    let feedback = JSON.parse(localStorage.getItem('greFeedback')) || {};
    if (!Array.isArray(feedback[word])) {
      feedback[word] = [];
    }
    feedback[word].push(rating);
    localStorage.setItem('greFeedback', JSON.stringify(feedback));
  }
  
  export function getAverageRating(word) {
    const feedback = JSON.parse(localStorage.getItem('greFeedback')) || {};
    const ratings = Array.isArray(feedback[word]) ? feedback[word] : [];
    if (ratings.length === 0) return 0;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }