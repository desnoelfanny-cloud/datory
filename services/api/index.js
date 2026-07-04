// Shared entry point for public API services.
window.apiServices = {
  insee: window.InseeService || null,
  ban: window.fetchBanCuriosity,
  geo: window.fetchGeoStory,
  dataGouv: window.fetchDataGouvStories,
  openMeteo: window.fetchOpenMeteoStory,
  worldBank: window.fetchWorldBankStory,
  rte: window.fetchRteStory
};
