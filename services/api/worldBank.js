async function fetchWorldBankStory() {
  const response = await fetch('https://api.worldbank.org/v2/country/FRA/indicator/NY.GDP.MKTP.CD?format=json&per_page=1');
  if (!response.ok) throw new Error('World Bank request failed');
  const payload = await response.json();
  const item = payload?.[1]?.[0];
  if (!item) return null;

  return {
    id: `worldbank-${Date.now()}`,
    category: 'Économie',
    title: `Économie française : ${item.value ? 'données mises à jour' : 'signal observé'}`,
    description: `La World Bank expose des indicateurs macroéconomiques utiles pour des stories de contexte international.`,
    source: 'World Bank',
    date: 'API publique',
    popularity: 86,
    readingTime: '3 min de lecture',
    icon: '🌍',
    backgroundColor: 'linear-gradient(135deg, #eef5ff, #dfeeff)',
    apiSource: 'World Bank'
  };
}

window.fetchWorldBankStory = fetchWorldBankStory;
