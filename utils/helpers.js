// Small helper utilities shared across the app.
function normalizeStory(item) {
  return item instanceof DataItem ? item : new DataItem(item);
}

function toStoryArray(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => normalizeStory(item));
}

window.normalizeStory = normalizeStory;
window.toStoryArray = toStoryArray;
