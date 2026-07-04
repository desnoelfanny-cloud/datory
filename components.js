// Compatibility wrapper for the card renderer.
function DataCard(item, index = 0) {
  return window.DataCard ? window.DataCard(item, index) : '';
}

window.DataCard = DataCard;
