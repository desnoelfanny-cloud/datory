// Minimal scoring helper for future story ranking.
function calculateScore(item) {
  return item.popularity || 0;
}

window.calculateScore = calculateScore;
