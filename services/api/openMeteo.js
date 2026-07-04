async function fetchOpenMeteoStory() {
  const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,precipitation_probability');
  if (!response.ok) throw new Error('Open-Meteo request failed');
  const payload = await response.json();
  const current = payload?.current;
  if (!current) return null;

  return {
    id: `openmeteo-${Date.now()}`,
    category: 'Climat',
    title: `Météo de Paris : ${current.temperature_2m}°C`,
    description: `Une température observée et des précipitations probables sont aujourd’hui disponibles via Open-Meteo.`,
    source: 'Open-Meteo',
    date: 'API publique',
    popularity: 88,
    readingTime: '2 min de lecture',
    icon: '🌦️',
    backgroundColor: 'linear-gradient(135deg, #eefbf6, #d9f5e7)',
    apiSource: 'Open-Meteo'
  };
}

window.fetchOpenMeteoStory = fetchOpenMeteoStory;
