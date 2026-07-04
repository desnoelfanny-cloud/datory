// Minimal story-generation helper for future evolutions.
function generateStoryFromData(item) {
  return normalizeStory(item);
}

window.generateStoryFromData = generateStoryFromData;
