async function fetchBanCuriosity() {
  const query = ['rue du paradis', 'rue de l\'enfer', 'chemin des amoureux', 'rue de la soif', 'rue du chat', 'rue de la paix'][Math.floor(Math.random() * 6)];
  const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=1`);
  if (!response.ok) throw new Error('BAN request failed');
  const payload = await response.json();
  const properties = payload?.features?.[0]?.properties;
  if (!properties) return null;

  return {
    id: `ban-${Date.now()}`,
    category: 'Curiosités',
    title: `Cette adresse existe vraiment : ${properties.name || properties.label || query}`,
    description: `Trouvée à ${properties.city || 'France'} grâce à la Base Adresse Nationale.`,
    source: 'Base Adresse Nationale',
    date: 'API publique',
    popularity: 91,
    readingTime: '2 min de lecture',
    icon: '🗺️',
    backgroundColor: 'linear-gradient(135deg, #fff8ec, #ffeccd)',
    isCuriosity: true,
    apiSource: 'Base Adresse Nationale'
  };
}

window.fetchBanCuriosity = fetchBanCuriosity;
