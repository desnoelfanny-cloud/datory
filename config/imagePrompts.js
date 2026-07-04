(function () {
  const CATEGORY_IMAGE_PROMPTS = {
    Économie: 'Illustration premium de l’économie française, avec graphiques modernes, immeubles d’affaires, ambiance professionnelle et lumière naturelle douce.',
    Immobilier: 'Illustration premium d’un quartier résidentiel contemporain, maison architecturale élégante, lumière naturelle douce et atmosphère chaleureuse.',
    Travail: 'Illustration premium d’un bureau moderne et coworking, télétravail, collaboration, ambiance lumineuse et calme.',
    Tech: 'Illustration premium d’intelligence artificielle, circuits électroniques, cloud computing, serveurs et ambiance futuriste élégante.',
    Climat: 'Illustration premium d’un paysage naturel vivant, forêt, eau, métrologie environnementale, lumière douce et atmosphère écologique.',
    Curiosités: 'Illustration premium d’un village français pittoresque, rue insolite, patrimoine local, ambiance lumineuse et élégante.',
    Données: 'Illustration premium d’un univers de données abstrait, visualisation élégante, lumière douce et ambiance moderne.'
  };

  const IMAGE_STYLE = 'Style illustration moderne, semi-réaliste, premium, très lumineuse, couleurs douces en bleu, cyan, blanc et pastel, inspirée d’illustrations premium tech/editorial, sans photo, sans texte, sans logo, sans filigrane.';

  function getCategoryPrompt(category) {
    const normalizedCategory = typeof window.normalizeCategory === 'function' ? window.normalizeCategory(category) : category;
    return CATEGORY_IMAGE_PROMPTS[normalizedCategory] || CATEGORY_IMAGE_PROMPTS.Données;
  }

  window.DATORY_IMAGE_PROMPTS = CATEGORY_IMAGE_PROMPTS;
  window.DATORY_IMAGE_STYLE = IMAGE_STYLE;
  window.getCategoryPrompt = getCategoryPrompt;
})();
