// Mock data used to populate the homepage cards without any backend.
const mockData = [
  new DataItem({
    id: 1,
    title: 'L’économie française se redessine autour des usages IA',
    description: 'Les entreprises réorganisent leurs priorités à mesure que l’IA devient un levier quotidien.',
    category: 'Économie',
    source: 'DATORY',
    date: '04 juil. 2026',
    image: '',
    url: '#',
    readingTime: '5 min de lecture',
    popularity: 92,
    icon: '🤖',
    backgroundColor: 'linear-gradient(135deg, #eef5ff, #dfeeff)'
  }),
  new DataItem({
    id: 2,
    title: 'Le climat change la géographie des biens immobiliers',
    description: 'Les zones exposées aux risques voient leur attractivité se recomposer.',
    category: 'Immobilier',
    source: 'DATORY',
    date: '03 juil. 2026',
    image: '',
    url: '#',
    readingTime: '6 min de lecture',
    popularity: 89,
    icon: '🏡',
    backgroundColor: 'linear-gradient(135deg, #f0fcff, #dff8ff)'
  }),
  new DataItem({
    id: 3,
    title: 'Le travail hybride redéfinit les centres urbains',
    description: 'Les offices de tourisme et les commerces adaptent leurs offres à de nouveaux rythmes.',
    category: 'Travail',
    source: 'DATORY',
    date: '02 juil. 2026',
    image: '',
    url: '#',
    readingTime: '4 min de lecture',
    popularity: 86,
    icon: '💼',
    backgroundColor: 'linear-gradient(135deg, #fff8ec, #ffeccd)'
  }),
  new DataItem({
    id: 4,
    title: 'La tech française attire de nouveaux talents',
    description: 'Les salaires, la qualité de vie et la présence de talents changent la carte du recrutement.',
    category: 'Tech',
    source: 'DATORY',
    date: '01 juil. 2026',
    image: '',
    url: '#',
    readingTime: '7 min de lecture',
    popularity: 91,
    icon: '⚡',
    backgroundColor: 'linear-gradient(135deg, #f5f0ff, #e8ddff)'
  }),
  new DataItem({
    id: 5,
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
    id: 6,
    title: 'Les services publics se digitalisent plus vite',
    description: 'Un usage accru des services en ligne transforme la relation entre citoyens et administrations.',
    category: 'Économie',
    source: 'DATORY',
    date: '29 juin 2026',
    image: '',
    url: '#',
    readingTime: '5 min de lecture',
    popularity: 84,
    icon: '📱',
    backgroundColor: 'linear-gradient(135deg, #f8f1ff, #ebdcff)'
  })
];

window.mockData = mockData;
