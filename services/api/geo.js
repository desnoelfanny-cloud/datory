async function fetchGeoStory() {
  const response = await fetch('https://geo.api.gouv.fr/regions?fields=nom,code');
  if (!response.ok) throw new Error('geo.api.gouv.fr request failed');
  const regions = await response.json();
  const region = regions?.[0];
  if (!region) return null;

  return {
    id: `geo-${Date.now()}`,
    category: 'Climat',
    title: `La région ${region.nom} reste un point de repère géographique majeur`,
    description: `geo.api.gouv.fr fournit des informations officielles sur les territoires, utiles pour enrichir les cartes éditoriales.`,
    source: 'geo.api.gouv.fr',
    date: 'API publique',
    popularity: 87,
    readingTime: '3 min de lecture',
    icon: '🧭',
    backgroundColor: 'linear-gradient(135deg, #f0fcff, #dff8ff)',
    apiSource: 'geo.api.gouv.fr'
  };
}

window.fetchGeoStory = fetchGeoStory;
