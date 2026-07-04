// App entry point for the editorial landing page.
let stories = [...(window.mockData || [])];
let activeCategory = 'Tous';

const categories = ['Tous', 'Économie', 'Immobilier', 'Travail', 'Tech', 'Climat', 'Curiosités'];

const curiosityDefaults = {
  title: 'Les noms de rues les plus insolites de France',
  teaser: 'Des toponymes surprenants révèlent des histoires locales souvent oubliées.',
  source: 'Source : Base Adresse Nationale'
};

const todayGrid = document.getElementById('today-grid');
const filtersContainer = document.getElementById('story-filters');
const detailContainer = document.getElementById('story-detail');

function renderFilters() {
  if (!filtersContainer) return;
  filtersContainer.innerHTML = categories.map((category) => {
    const theme = getCategoryTheme(category);
    const isActive = category === activeCategory;
    return `
      <button class="filter-pill${isActive ? ' active' : ''}" type="button" data-category="${category}" style="${isActive ? `background: ${theme.background}; color: ${theme.color}; border-color: ${theme.color}30;` : `color: ${theme.color}; border-color: ${theme.color}20;`}">${category}</button>
    `;
  }).join('');

  filtersContainer.querySelectorAll('.filter-pill').forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category;
      renderFilters();
      renderStories();
    });
  });
}

function getVisibleStories() {
  if (activeCategory === 'Tous') return stories;
  return stories.filter((story) => story.category === activeCategory);
}

function renderStories() {
  if (!todayGrid) return;
  const visibleStories = getVisibleStories();
  todayGrid.innerHTML = visibleStories
    .map((story, index) => window.DataCard(story, index))
    .join('');

  todayGrid.querySelectorAll('.story-read-link').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const storyId = button.dataset.storyId;
      const story = stories.find((item) => String(item.id) === String(storyId));
      if (story) {
        showStoryDetail(story);
      }
    });
  });
}

function buildStoryDetailData(story) {
  const description = story.description || story.teaser || '';

  return {
    summary: story.summary || description || 'Cette donnée met en lumière un signal intéressant à suivre.',
    keyFigures: story.keyFigures || [
      { label: 'Source', value: story.source || 'DATORY' },
      { label: 'Catégorie', value: story.category || 'Données' },
      { label: 'Score', value: story.popularity || 85 },
      { label: 'Lecture', value: story.readingTime || '5 min' }
    ],
    takeaways: story.takeaways || [
      'Un signal utile pour comprendre une tendance actuelle.',
      'Une donnée issue de sources publiques ou ouvertes.',
      'Un sujet à suivre pour mieux lire les évolutions du territoire ou de l’économie.'
    ],
    whyItMatters: story.whyItMatters || description || 'Cette story aide à transformer une donnée brute en information compréhensible.',
    sources: story.officialSources || [
      { name: story.source || 'DATORY', url: story.url || '#' }
    ]
  };
}

function getStoryDetailImage(story) {
  const explicitImage =
    story.imageUrl ||
    story.image ||
    story.thumbnail ||
    story.coverImage ||
    story.illustration;

  if (explicitImage) return explicitImage;

  if (typeof getCategoryImage === 'function') {
    return getCategoryImage(story.category);
  }

  return '';
}

function getStoryDetailContent(story) {
  const title = story.title || '';
  const category = story.category || 'Données';
  const source = story.source || story.apiSource || 'Source publique';
  const description = story.description || story.teaser || '';
  const score = story.popularity || 85;
  const readingTime = story.readingTime || '2 min de lecture';

  const isGeo = source.toLowerCase().includes('geo') || title.toLowerCase().includes('région');
  const isBan = source.toLowerCase().includes('adresse') || title.toLowerCase().includes('rue');
  const isDataGouv = source.toLowerCase().includes('data.gouv');
  const isWorldBank = source.toLowerCase().includes('world bank');
  const isMeteo = source.toLowerCase().includes('meteo') || category === 'Climat';

  if (isBan) {
    return {
      summary: `Cette adresse insolite existe réellement dans la Base Adresse Nationale. Derrière un simple nom de rue, on découvre souvent une trace locale : une tradition, une ancienne activité, un lieu-dit ou une anecdote qui a fini par entrer dans la cartographie officielle.`,
      keyFigures: [
        { label: 'Source', value: 'Base Adresse Nationale' },
        { label: 'Type', value: 'Adresse officielle' },
        { label: 'Thème', value: 'Curiosité locale' },
        { label: 'Lecture', value: readingTime }
      ],
      takeaways: [
        'Le nom de rue est issu d’une base officielle.',
        'Les adresses racontent parfois l’histoire locale mieux qu’un chiffre.',
        'Ce type de donnée montre que l’open data peut aussi être culturel et surprenant.'
      ],
      why: `Ce sujet est intéressant parce qu’il transforme une donnée administrative très froide — une adresse — en point d’entrée vers le patrimoine local. Datory s’en sert pour montrer que les données publiques ne parlent pas seulement d’économie ou de climat : elles racontent aussi des lieux, des usages et des histoires du quotidien.`,
      sources: [{ name: 'Base Adresse Nationale', url: story.url || '#' }]
    };
  }

  if (isGeo) {
    return {
      summary: `Cette story s’appuie sur les données territoriales de geo.api.gouv.fr. Elle met en avant une zone géographique officielle afin de mieux comprendre comment les territoires français sont structurés, identifiés et réutilisés dans les services publics numériques.`,
      keyFigures: [
        { label: 'Source', value: 'geo.api.gouv.fr' },
        { label: 'Type', value: 'Donnée territoriale' },
        { label: 'Catégorie', value: category },
        { label: 'Score', value: score }
      ],
      takeaways: [
        'Les régions, communes et départements servent de socle à de nombreuses analyses publiques.',
        'Une donnée géographique fiable permet de croiser ensuite emploi, climat, logement ou mobilité.',
        'Le territoire est souvent le point de départ pour rendre une donnée compréhensible.'
      ],
      why: `Comprendre la donnée géographique est essentiel, car elle sert de base à presque toutes les politiques publiques : logement, transport, emploi, santé ou climat. Une région ou une commune n’est pas seulement un nom sur une carte : c’est une clé pour relier les données entre elles.`,
      sources: [{ name: 'geo.api.gouv.fr', url: story.url || '#' }]
    };
  }

  if (isDataGouv) {
    return {
      summary: `Cette story provient d’un jeu de données publié sur data.gouv.fr. L’intérêt est de repérer rapidement un sujet public exploitable, sans avoir à parcourir une fiche technique longue ou difficile à lire.`,
      keyFigures: [
        { label: 'Source', value: 'data.gouv.fr' },
        { label: 'Type', value: 'Jeu de données public' },
        { label: 'Catégorie', value: category },
        { label: 'Score', value: score }
      ],
      takeaways: [
        'Le jeu de données est public et réutilisable.',
        'Son titre révèle un sujet exploitable pour comprendre une politique ou un phénomène.',
        'Datory transforme la fiche brute en point d’entrée lisible.'
      ],
      why: `data.gouv.fr regroupe énormément de données utiles, mais leur présentation reste souvent technique. L’enjeu de Datory est de transformer ces jeux de données en histoires simples : ce que le sujet révèle, pourquoi il mérite attention, et comment il peut être réutilisé.`,
      sources: [{ name: 'data.gouv.fr', url: story.url || '#' }]
    };
  }

  if (isWorldBank) {
    return {
      summary: `Cette story s’appuie sur les indicateurs de la Banque mondiale pour donner un contexte économique international. Ces données permettent de comparer les pays, suivre les grandes tendances et replacer une information nationale dans une lecture plus globale.`,
      keyFigures: [
        { label: 'Source', value: 'World Bank' },
        { label: 'Type', value: 'Indicateur macroéconomique' },
        { label: 'Catégorie', value: 'Économie' },
        { label: 'Score', value: score }
      ],
      takeaways: [
        'Les indicateurs internationaux aident à comparer les économies.',
        'Ils donnent du recul sur les tendances nationales.',
        'Ils sont utiles pour comprendre croissance, emploi, inflation ou développement.'
      ],
      why: `Les données économiques sont plus parlantes lorsqu’elles sont comparées. La Banque mondiale permet de sortir d’une lecture isolée et de replacer un chiffre dans un contexte international, ce qui aide à mieux comprendre les tendances de fond.`,
      sources: [{ name: 'World Bank', url: story.url || '#' }]
    };
  }

  if (isMeteo) {
    return {
      summary: `Cette story met en avant une donnée liée au climat ou à la météo. L’objectif est de transformer un signal environnemental en information concrète : ce qui change, où cela se produit, et pourquoi cela peut avoir un impact sur les territoires.`,
      keyFigures: [
        { label: 'Source', value: source },
        { label: 'Type', value: 'Donnée climat / météo' },
        { label: 'Catégorie', value: category },
        { label: 'Score', value: score }
      ],
      takeaways: [
        'Les données climatiques permettent de suivre des évolutions concrètes.',
        'Elles peuvent avoir un impact sur les territoires, l’immobilier ou les usages.',
        'Un signal météo devient plus utile lorsqu’il est expliqué simplement.'
      ],
      why: `Les données climatiques intéressent de plus en plus car elles touchent directement le quotidien : chaleur, pluie, sécheresse, risques naturels ou attractivité des territoires. Datory les met en contexte pour éviter une lecture purement technique.`,
      sources: [{ name: source, url: story.url || '#' }]
    };
  }

  return {
    summary: description || `Cette story met en avant une donnée publique utile, récente ou surprenante.`,
    keyFigures: [
      { label: 'Source', value: source },
      { label: 'Catégorie', value: category },
      { label: 'Score', value: score },
      { label: 'Lecture', value: readingTime }
    ],
    takeaways: [
      'Une donnée publique rendue plus lisible.',
      'Un sujet sélectionné pour son intérêt éditorial.',
      'Une lecture courte pour comprendre rapidement l’essentiel.'
    ],
    why: description || `Cette donnée mérite attention car elle permet de mieux comprendre un sujet concret à partir d’une source publique.`,
    sources: [{ name: source, url: story.url || '#' }]
  };
}

function showStoryDetail(story) {
  if (!detailContainer || !story) return;

  const detail = getStoryDetailContent(story);
  const image = getStoryDetailImage(story);

  detailContainer.hidden = false;
  todayGrid.hidden = true;
  filtersContainer.hidden = true;

  detailContainer.innerHTML = `
    <article class="detail-card detail-rich">
      <button class="detail-back" type="button" id="detail-back">← Retour aux stories</button>

      ${image ? `
        <div class="detail-visual">
          <img src="${image}" alt="${story.title}" loading="lazy" />
        </div>
      ` : ''}

      <p class="eyebrow">${story.category || 'Story'}</p>
      <h2>${story.title}</h2>

      <section class="detail-block detail-summary">
        <h4>En 30 secondes</h4>
        <p>${detail.summary}</p>
      </section>

      <section class="detail-block">
        <h4>Les chiffres clés</h4>
        <div class="key-figures">
          ${detail.keyFigures.map((item) => `
            <div class="key-figure">
              <span>${item.label}</span>
              <strong>${item.value}</strong>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="detail-block">
        <h4>Ce qu’il faut retenir</h4>
        <ul class="takeaways">
          ${detail.takeaways.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </section>

      <section class="detail-block">
        <h4>Pourquoi c’est intéressant</h4>
        <p>${detail.why}</p>
      </section>

      <section class="detail-block">
        <h4>Sources officielles</h4>
        <div class="detail-sources">
          ${detail.sources.map((source) => `
            <a href="${source.url || '#'}" target="_blank" rel="noopener">
              ${source.name}
            </a>
          `).join('')}
        </div>
      </section>
    </article>
  `;

  document.getElementById('detail-back').addEventListener('click', () => {
    detailContainer.hidden = true;
    todayGrid.hidden = false;
    filtersContainer.hidden = false;
    renderStories();
  });

  detailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setCuriosityCardState({ title, teaser, loading = false }) {
  const card = document.querySelector('[data-story="curiosities"]');
  if (!card) return;

  const titleEl = card.querySelector('.curiosity-title');
  const teaserEl = card.querySelector('.curiosity-teaser');
  const sourceEl = card.querySelector('.source-line');
  const buttonEl = card.querySelector('.curiosity-refresh');

  if (!titleEl || !teaserEl || !buttonEl) return;

  if (loading) {
    titleEl.textContent = 'Recherche d’une adresse insolite...';
    teaserEl.textContent = 'Une adresse surprenante est en cours de vérification.';
    buttonEl.disabled = true;
    return;
  }

  titleEl.textContent = title;
  teaserEl.textContent = teaser;
  if (sourceEl) {
    sourceEl.textContent = curiosityDefaults.source;
  }
  buttonEl.disabled = false;
}

async function hydrateCuriosityCard(shouldRefresh = false) {
  const card = document.querySelector('[data-story="curiosities"]');
  if (!card) return;

  if (shouldRefresh) {
    setCuriosityCardState({ loading: true });
  }

  try {
    const banService = window.fetchBanCuriosity;
    if (typeof banService === 'function') {
      const story = await banService();
      if (story) {
        setCuriosityCardState({
          title: story.title,
          teaser: story.description
        });
        return;
      }
    }
  } catch (error) {
    console.warn('Unable to hydrate curiosity card from BAN API:', error);
  }

  setCuriosityCardState({
    title: curiosityDefaults.title,
    teaser: curiosityDefaults.teaser
  });
}

async function loadExternalStories() {
  const loaders = [
    window.fetchBanCuriosity,
    window.fetchGeoStory,
    window.fetchDataGouvStories,
    window.fetchOpenMeteoStory,
    window.fetchWorldBankStory,
    window.fetchRteStory
  ].filter(Boolean);

  const resolvedStories = [];

  for (const loader of loaders) {
    try {
      const result = await loader();
      if (Array.isArray(result)) {
        resolvedStories.push(...result);
      } else if (result) {
        resolvedStories.push(result);
      }
    } catch (error) {
      console.warn('Public API story load failed:', error);
    }
  }

  return resolvedStories;
}

async function loadStories() {
  let externalStories = [];

  try {
    externalStories = await loadExternalStories();
  } catch (error) {
    console.warn('Unable to load public API stories; continuing with mocks.', error);
  }

  try {
    const service = window.InseeService ? new window.InseeService() : null;
    if (service) {
      const inseeStories = await service.getStories();
      if (Array.isArray(inseeStories) && inseeStories.length) {
        externalStories = [...inseeStories, ...externalStories];
      }
    }
  } catch (error) {
    console.warn('Unable to load INSEE data; continuing with fallback.', error);
  }

  const baseStories = [...(window.mockData || [])];
  stories = [...externalStories, ...baseStories];

  renderFilters();
  renderStories();
  hydrateCuriosityCard();

  const refreshButton = document.querySelector('[data-story="curiosities"] .curiosity-refresh');
  if (refreshButton) {
    refreshButton.addEventListener('click', () => hydrateCuriosityCard(true));
  }
}

function init() {
  loadStories();
}

init();
