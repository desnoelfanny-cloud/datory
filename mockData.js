// Static mock data used to populate the landing page cards.
const mockData = [
  new DataItem({
    id: 1,
    category: 'Énergie',
    title: 'Où faire son plein moins cher cette semaine ?',
    teaser: 'Les prix varient selon les régions, les réseaux et les horaires de circulation.',
    popularity: 96,
    readingTime: '4 min de lecture',
    icon: '⛽',
    backgroundColor: 'linear-gradient(135deg, #eef5ff, #dfeeff)'
  }),
  new DataItem({
    id: 2,
    category: 'Météo',
    title: 'Ces départements sous surveillance météo',
    teaser: 'Les alertes se multiplient là où les températures et l’humidité montent en même temps.',
    popularity: 94,
    readingTime: '5 min de lecture',
    icon: '🌧️',
    backgroundColor: 'linear-gradient(135deg, #f0fcff, #dff8ff)'
  }),
  new DataItem({
    id: 3,
    category: 'Curiosités',
    title: 'Les noms de rues les plus insolites de France',
    teaser: 'Des toponymes surprenants révèlent des histoires locales souvent oubliées.',
    popularity: 92,
    readingTime: '6 min de lecture',
    icon: '🗺️',
    backgroundColor: 'linear-gradient(135deg, #fff8ec, #ffeccd)',
    isCuriosity: true
  }),
  new DataItem({
    id: 4,
    category: 'Immobilier',
    title: 'Les villes où l’immobilier bouge le plus',
    teaser: 'Des signes précis montrent où les logements se vendent plus vite et à quel prix.',
    popularity: 91,
    readingTime: '7 min de lecture',
    icon: '🏡',
    backgroundColor: 'linear-gradient(135deg, #f5f0ff, #e8ddff)'
  })
];
