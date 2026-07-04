async function fetchDataGouvStories() {
  const response = await fetch('https://www.data.gouv.fr/api/1/datasets/?page=1&page_size=4');
  if (!response.ok) throw new Error('data.gouv.fr request failed');
  const payload = await response.json();
  const datasets = payload?.data || [];

  return datasets.slice(0, 3).map((dataset, index) => ({
    id: `datagouv-${Date.now()}-${index}`,
    category: index % 2 === 0 ? 'Économie' : 'Tech',
    title: dataset.title || 'Jeu de données public',
    description: dataset.description || 'Un jeu de données public enrichit la page avec une source ouverte.',
    source: 'data.gouv.fr',
    date: 'API publique',
    popularity: 84 + index,
    readingTime: '4 min de lecture',
    icon: index % 2 === 0 ? '📊' : '💡',
    backgroundColor: index % 2 === 0 ? 'linear-gradient(135deg, #eef5ff, #dfeeff)' : 'linear-gradient(135deg, #f5f0ff, #e8ddff)',
    apiSource: 'data.gouv.fr'
  }));
}

window.fetchDataGouvStories = fetchDataGouvStories;
