function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function detectTopic(story) {
  const text = normalizeText(`${story.title} ${story.description || story.teaser} ${story.source} ${story.category}`);

  if (text.includes('fete de la science') || text.includes('science') || text.includes('recherche')) return 'science';
  if (text.includes('adresse') || text.includes('rue') || text.includes('village') || text.includes('commune')) return 'curiosity';
  if (text.includes('meteo') || text.includes('climat') || text.includes('temperature') || text.includes('secheresse')) return 'climate';
  if (text.includes('immobilier') || text.includes('logement') || text.includes('loyer') || text.includes('maison')) return 'realEstate';
  if (text.includes('travail') || text.includes('emploi') || text.includes('salaire') || text.includes('recrutement')) return 'work';
  if (text.includes('tech') || text.includes('ia') || text.includes('intelligence artificielle') || text.includes('numerique')) return 'tech';
  if (text.includes('economie') || text.includes('inflation') || text.includes('prix') || text.includes('banque') || text.includes('world bank')) return 'economy';
  if (text.includes('geo.api') || text.includes('region') || text.includes('departement') || text.includes('territoire')) return 'territory';
  if (text.includes('data.gouv')) return 'publicData';

  return 'default';
}

function createSource(story) {
  return [{
    name: story.source || story.apiSource || 'Source publique',
    url: story.url || '#'
  }];
}

const editorialTemplates = {
  science(story) {
    return {
      summary: `Cette story met en avant un événement ou un jeu de données lié à la culture scientifique. L’intérêt pour le lecteur est simple : comprendre rapidement où et comment la science devient accessible au grand public, sans devoir parcourir une fiche technique.`,
      keyFigures: [
        { label: 'Sujet', value: 'Culture scientifique' },
        { label: 'Source', value: story.source || 'data.gouv.fr' },
        { label: 'Public', value: 'Grand public' },
        { label: 'Lecture', value: story.readingTime || '2 min' }
      ],
      takeaways: [
        'Le sujet rend la science plus accessible.',
        'La donnée permet d’identifier des événements ou initiatives concrètes.',
        'Datory transforme une fiche brute en lecture rapide et utile.'
      ],
      whyItMatters: `Ce contenu est intéressant parce qu’il montre que l’open data ne sert pas seulement à suivre des indicateurs économiques ou administratifs. Elle peut aussi aider à découvrir des événements culturels, éducatifs et scientifiques proches des citoyens.`,
      sources: createSource(story)
    };
  },

  climate(story) {
    return {
      summary: `Cette story traduit une donnée météo ou climatique en information concrète. L’objectif est de comprendre rapidement ce que le signal indique : chaleur, météo locale, tendance environnementale ou impact potentiel sur les usages du quotidien.`,
      keyFigures: [
        { label: 'Sujet', value: 'Climat / météo' },
        { label: 'Source', value: story.source || 'Open-Meteo' },
        { label: 'Impact', value: 'Territoire' },
        { label: 'Lecture', value: story.readingTime || '2 min' }
      ],
      takeaways: [
        'La donnée climatique devient plus utile lorsqu’elle est contextualisée.',
        'Elle peut influencer les déplacements, les activités ou les décisions locales.',
        'Elle relie des chiffres à des effets concrets.'
      ],
      whyItMatters: `Les données climatiques sont souvent consultées comme de simples chiffres. Datory les reformule pour aider le lecteur à comprendre ce qu’elles signifient vraiment pour un territoire, une journée ou une tendance plus large.`,
      sources: createSource(story)
    };
  },

  curiosity(story) {
    return {
      summary: `Cette story part d’une donnée officielle très simple — une adresse, une rue ou un lieu — pour révéler une curiosité locale. Derrière un nom parfois surprenant, on trouve souvent une trace de patrimoine, d’usage ancien ou d’histoire du territoire.`,
      keyFigures: [
        { label: 'Sujet', value: 'Curiosité locale' },
        { label: 'Source', value: 'Base Adresse Nationale' },
        { label: 'Type', value: 'Adresse officielle' },
        { label: 'Lecture', value: story.readingTime || '2 min' }
      ],
      takeaways: [
        'L’adresse provient d’une source officielle.',
        'Les noms de lieux peuvent raconter une histoire locale.',
        'L’open data peut aussi être culturelle et surprenante.'
      ],
      whyItMatters: `Cette story montre que les données publiques ne sont pas réservées aux experts. Elles peuvent aussi rendre visibles des détails du quotidien, des territoires et du patrimoine local.`,
      sources: createSource(story)
    };
  },

  territory(story) {
    return {
      summary: `Cette story utilise une donnée territoriale pour mieux comprendre l’organisation géographique française. Région, commune ou département : ces éléments servent souvent de base pour analyser l’emploi, le logement, la mobilité ou les politiques publiques.`,
      keyFigures: [
        { label: 'Sujet', value: 'Territoire' },
        { label: 'Source', value: story.source || 'geo.api.gouv.fr' },
        { label: 'Usage', value: 'Analyse locale' },
        { label: 'Lecture', value: story.readingTime || '2 min' }
      ],
      takeaways: [
        'Les territoires structurent de nombreuses données publiques.',
        'Une région ou une commune sert souvent de clé d’analyse.',
        'La géographie permet de rendre les données plus concrètes.'
      ],
      whyItMatters: `Comprendre une donnée territoriale, c’est poser les bases pour interpréter d’autres sujets : immobilier, emploi, climat, services publics ou mobilité. Le territoire donne un contexte aux chiffres.`,
      sources: createSource(story)
    };
  },

  publicData(story) {
    return {
      summary: `Cette story provient d’un jeu de données public. Datory en extrait l’essentiel pour éviter au lecteur de parcourir une fiche technique parfois longue, peu lisible ou très administrative.`,
      keyFigures: [
        { label: 'Sujet', value: 'Donnée publique' },
        { label: 'Source', value: story.source || 'data.gouv.fr' },
        { label: 'Format', value: 'Jeu de données' },
        { label: 'Lecture', value: story.readingTime || '2 min' }
      ],
      takeaways: [
        'Le jeu de données est public et réutilisable.',
        'Son sujet peut éclairer une politique, un territoire ou un phénomène.',
        'Datory transforme la fiche brute en point d’entrée lisible.'
      ],
      whyItMatters: `data.gouv.fr contient énormément de ressources utiles, mais elles sont rarement pensées pour une lecture grand public. Datory ajoute une couche de compréhension pour rendre ces données plus accessibles.`,
      sources: createSource(story)
    };
  },

  economy(story) {
    return {
      summary: `Cette story traduit une donnée économique en lecture simple. L’objectif est de comprendre rapidement ce qu’elle peut indiquer sur les prix, l’activité, les entreprises, le pouvoir d’achat ou les tendances de fond.`,
      keyFigures: [
        { label: 'Sujet', value: 'Économie' },
        { label: 'Source', value: story.source || 'Source économique' },
        { label: 'Impact', value: 'Pouvoir d’achat / activité' },
        { label: 'Lecture', value: story.readingTime || '2 min' }
      ],
      takeaways: [
        'Les données économiques gagnent en valeur lorsqu’elles sont expliquées.',
        'Elles peuvent révéler des signaux faibles ou des tendances lourdes.',
        'Datory privilégie une lecture courte et compréhensible.'
      ],
      whyItMatters: `Les chiffres économiques sont souvent commentés mais rarement vulgarisés. Datory cherche à montrer ce que ces données peuvent changer concrètement dans la lecture du quotidien, des entreprises ou des territoires.`,
      sources: createSource(story)
    };
  },

  default(story) {
    return {
      summary: story.description || story.teaser || `Cette story transforme une donnée publique en information courte, claire et vérifiable.`,
      keyFigures: [
        { label: 'Source', value: story.source || 'Source publique' },
        { label: 'Catégorie', value: story.category || 'Données' },
        { label: 'Score', value: story.popularity || 85 },
        { label: 'Lecture', value: story.readingTime || '2 min' }
      ],
      takeaways: [
        'Une donnée publique rendue plus lisible.',
        'Un sujet sélectionné pour son intérêt éditorial.',
        'Une lecture courte pour comprendre l’essentiel.'
      ],
      whyItMatters: story.description || story.teaser || `Cette donnée mérite attention car elle permet de mieux comprendre un sujet concret à partir d’une source publique.`,
      sources: createSource(story)
    };
  }
};

function getEditorialContent(story) {
  const topic = detectTopic(story);
  const template = editorialTemplates[topic] || editorialTemplates.default;
  return template(story);
}

window.getEditorialContent = getEditorialContent;