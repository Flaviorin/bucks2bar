module.exports = {
  // Utiliza el preset de Jest para Playwright
  preset: 'jest-playwright-preset',
  // Define un patrón para que esta configuración solo ejecute los tests de esta carpeta
  testMatch: ['**/tests_VISUAL/**/*.test.js'],
};