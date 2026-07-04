const CATEGORY_THEME_MAP = {
  Économie: {
    name: 'Économie',
    label: 'Économie',
    color: '#2563EB',
    accent: '#60A5FA',
    background: 'linear-gradient(135deg, #EEF5FF, #DDEEFF)',
    pill: 'rgba(37, 99, 235, 0.1)',
    icon: '📊'
  },
  Immobilier: {
    name: 'Immobilier',
    label: 'Immobilier',
    color: '#2F766E',
    accent: '#8FD3C7',
    background: 'linear-gradient(135deg, #EEF9F7, #D8F3EB)',
    pill: 'rgba(47, 118, 110, 0.12)',
    icon: '🏠'
  },
  Travail: {
    name: 'Travail',
    label: 'Travail',
    color: '#B45309',
    accent: '#F7C97A',
    background: 'linear-gradient(135deg, #FFF8ED, #FCE7B3)',
    pill: 'rgba(180, 83, 9, 0.12)',
    icon: '💼'
  },
  Tech: {
    name: 'Tech',
    label: 'Tech',
    color: '#6D28D9',
    accent: '#8B5CF6',
    background: 'linear-gradient(135deg, #F6F1FF, #E8DDFF)',
    pill: 'rgba(109, 40, 217, 0.12)',
    icon: '⚡'
  },
  Climat: {
    name: 'Climat',
    label: 'Climat',
    color: '#047857',
    accent: '#34D399',
    background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
    pill: 'rgba(4, 120, 87, 0.12)',
    icon: '🌿'
  },
  Curiosités: {
    name: 'Curiosités',
    label: 'Curiosités',
    color: '#B7791F',
    accent: '#F6D365',
    background: 'linear-gradient(135deg, #FFF9E8, #FDECC8)',
    pill: 'rgba(183, 121, 31, 0.12)',
    icon: '✨'
  },
  Données: {
    name: 'Données',
    label: 'Données',
    color: '#64748B',
    accent: '#94A3B8',
    background: 'linear-gradient(135deg, #F8FAFC, #E2E8F0)',
    pill: 'rgba(100, 116, 139, 0.12)',
    icon: '◌'
  }
};

function normalizeCategory(category) {
  const value = (category || '').toString().trim().toLowerCase();
  if (!value) return 'Données';

  if (value.includes('econom') || value.includes('économie') || value.includes('eco')) return 'Économie';
  if (value.includes('immobili') || value.includes('real estate')) return 'Immobilier';
  if (value.includes('travail') || value.includes('work')) return 'Travail';
  if (value.includes('tech') || value.includes('technology')) return 'Tech';
  if (value.includes('climat') || value.includes('climate')) return 'Climat';
  if (value.includes('curios') || value.includes('curiosity')) return 'Curiosités';
  if (value.includes('donne') || value.includes('data') || value.includes('default')) return 'Données';

  return 'Données';
}

function getCategoryTheme(category) {
  const normalized = normalizeCategory(category);
  return CATEGORY_THEME_MAP[normalized] || CATEGORY_THEME_MAP['Données'];
}

window.CATEGORY_THEME_MAP = CATEGORY_THEME_MAP;
window.getCategoryTheme = getCategoryTheme;
window.normalizeCategory = normalizeCategory;
