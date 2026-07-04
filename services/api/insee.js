// Service layer for INSEE data.
class InseeService {
  constructor({ baseUrl = 'https://api.insee.fr/series/v1/data/', seriesId = window.INSEE_SERIES_ID || '' } = {}) {
    this.baseUrl = baseUrl;
    this.seriesId = seriesId;
  }

  getToken() {
    return window.INSEE_API_TOKEN || window.INSEE_TOKEN || '';
  }

  async getStories() {
    const token = this.getToken();
    const seriesId = this.seriesId;

    if (!token || !seriesId) {
      throw new Error('INSEE token or series ID is not configured.');
    }

    const response = await fetch(`${this.baseUrl}${encodeURIComponent(seriesId)}?startPeriod=202401&endPeriod=202406`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`INSEE request failed with status ${response.status}`);
    }

    const payload = await response.json();
    return this.transform(payload);
  }

  transform(payload) {
    const observations = this.extractObservations(payload);
    const latestValue = observations[observations.length - 1] || 0;
    const label = latestValue ? `${latestValue.toFixed(1)}%` : 'donnée disponible';

    return [
      new DataItem({
        id: 'insee-1',
        title: `Inflation mensuelle observée : ${label}`,
        description: 'Une première donnée INSEE a été récupérée et transformée pour enrichir la landing page.',
        category: 'Économie',
        source: 'INSEE',
        date: 'Données récentes',
        image: '',
        url: '#',
        readingTime: '3 min de lecture',
        popularity: 90,
        icon: '📈',
        backgroundColor: 'linear-gradient(135deg, #eef5ff, #dfeeff)'
      })
    ];
  }

  extractObservations(payload) {
    const series = payload?.series?.[0] || payload?.data?.[0] || null;
    const rawObservations = series?.observations || payload?.observations || [];

    return Object.values(rawObservations)
      .map((entry) => {
        if (typeof entry === 'number') return entry;
        if (entry && typeof entry === 'object') {
          return Number(entry.value ?? entry.V1 ?? entry.observation ?? 0);
        }
        return 0;
      })
      .filter((value) => Number.isFinite(value));
  }
}

window.InseeService = InseeService;
