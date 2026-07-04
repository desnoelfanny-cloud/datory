// Reusable card component used to render editorial items beneath the hero.
function getCategoryTone(category) {
  const normalized = String(category || '').toLowerCase();

  if (normalized.includes('économie') || normalized.includes('economie')) return 'tone-blue';
  if (normalized.includes('immobilier')) return 'tone-cyan';
  if (normalized.includes('travail')) return 'tone-amber';
  if (normalized.includes('tech')) return 'tone-violet';
  if (normalized.includes('climat')) return 'tone-green';
  if (normalized.includes('curiosit')) return 'tone-gold';

  return 'tone-blue';
}

function getCategoryImage(category) {
  const normalizedCategory = typeof window.normalizeCategory === 'function' ? window.normalizeCategory(category) : category;
  const categoryImageMap = {
    Économie: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
    Immobilier: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    Travail: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    Tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    Climat: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    Curiosités: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
    Données: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80'
  };

  return categoryImageMap[normalizedCategory] || categoryImageMap.Données;
}

function getCardImage(data, category) {
  const candidates = [data.imageUrl, data.image, data.thumbnail, data.coverImage, data.illustration];
  const explicitImage = candidates.find((value) => typeof value === 'string' && value.trim());
  return explicitImage ? explicitImage.trim() : getCategoryImage(category);
}

function renderCardVisual(image, title, icon) {
  if (!image) {
    return `<div class="card-visual-gradient">${icon}</div>`;
  }

  const safeTitle = String(title || 'Titre indisponible').replace(/"/g, '&quot;');
  const safeIcon = String(icon || '✦').replace(/'/g, "\\'");
  return `<img src="${image}" alt="${safeTitle}" loading="lazy" decoding="async" fetchpriority="low" onerror="window.DatoryCardFallback(this, '${safeIcon}')" />`;
}

function DatoryCardFallback(img, icon) {
  if (!img || !img.parentElement) return;
  img.remove();
  img.parentElement.innerHTML = `<div class="card-visual-gradient">${icon}</div>`;
}

function DataCard(item, index = 0) {
  const data = item instanceof DataItem ? item : new DataItem(item);
  const storyId = data.id ?? `story-${index}`;
  const title = data.title || 'Titre indisponible';
  const description = data.description || data.teaser || '';
  const category = data.category || 'Données';
  const source = data.source || 'DATORY';
  const date = data.date || '';
  const image = getCardImage(data, category);
  const readingTime = data.readingTime || '5 min de lecture';
  const popularity = data.popularity || 85;
  const icon = data.icon || '✦';
  const toneClass = getCategoryTone(category);
  const sourceLine = data.isCuriosity ? 'Source : Base Adresse Nationale' : '';

  return `
    <article class="today-card ${toneClass}${data.isCuriosity ? ' curiosities-card' : ''}" data-id="${storyId}" data-story="${data.isCuriosity ? 'curiosities' : ''}">
      <div class="card-visual">
        ${renderCardVisual(image, title, icon)}
      </div>

      <div class="card-top">
        <div class="card-emoji">${icon}</div>
        <span class="badge">${category}</span>
      </div>

      <h4 class="curiosity-title">${title}</h4>
      <p class="curiosity-teaser">${description}</p>
      ${data.isCuriosity ? `<p class="source-line">${sourceLine}</p><button class="curiosity-refresh" type="button">Trouver une autre adresse</button>` : ''}

      <div class="card-footer">
        <span>${source}${date ? ` • ${date}` : ''}</span>
        <button class="score-pill story-read-link" type="button" data-story-id="${storyId}">Lire</button>
      </div>

      <div class="card-footer" style="margin-top: 0.4rem;">
        <span>${readingTime}</span>
        <span class="score-pill">▲ ${popularity}</span>
      </div>
    </article>
  `;
}

window.DataCard = DataCard;
window.DatoryCardFallback = DatoryCardFallback;
