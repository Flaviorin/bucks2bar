module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  // Limpia automáticamente los mocks entre cada prueba
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  clearMocks: true,
};