// Data model for the editorial cards rendered on the homepage.
class DataItem {
  constructor({
    id,
    category,
    title,
    description = '',
    teaser = '',
    popularity = 85,
    readingTime = '5 min de lecture',
    icon = '✦',
    backgroundColor = 'linear-gradient(135deg, #eef5ff, #dfeeff)',
    isCuriosity = false,
    source = 'DATORY',
    date = '',
    image = '',
    url = '#'
  } = {}) {
    this.id = id;
    this.category = category;
    this.title = title;
    this.description = description || teaser;
    this.teaser = this.description;
    this.popularity = popularity;
    this.readingTime = readingTime;
    this.icon = icon;
    this.backgroundColor = backgroundColor;
    this.isCuriosity = isCuriosity;
    this.source = source;
    this.date = date;
    this.image = image;
    this.url = url;
  }
}
