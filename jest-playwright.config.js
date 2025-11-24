// jest-playwright.config.js
module.exports = {
  // Define los navegadores en los que se ejecutarán las pruebas (chromium, firefox, webkit)
  browsers: ['chromium'],
  // Opciones de lanzamiento para el navegador
  launchOptions: {
    // Poner en 'false' para ver la ejecución del navegador en tiempo real
    headless: false,
  },
};