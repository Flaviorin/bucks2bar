const path = require('path');

describe('Feature: Validación visual del nombre de usuario', () => {
  
  // GIVEN: Dado que el usuario está en la página principal
  beforeAll(async () => {
    const filePath = path.resolve(__dirname, '../src/index.html');
    await page.goto(`file://${filePath}`);
  });

  // Limpia el input antes de cada escenario para asegurar que son independientes
  beforeEach(async () => {
    await page.fill('#username', '');
  });

  describe('Scenario: El nombre de usuario es demasiado corto', () => {
    test('WHEN/THEN: Debería mostrar un borde rojo y tomar una captura', async () => {
      // WHEN: Cuando el usuario ingresa un nombre de usuario inválido ("Short1!")
      await page.type('#username', 'Short1!');

      // THEN: Entonces el borde del campo de texto debería ser rojo
      await page.waitForSelector('#username[style*="border-color: red"]');

      // AND: Y se debería generar una captura de pantalla del error
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'error-corto.png') });
    });
  });

  describe('Scenario: El nombre de usuario es demasiado largo', () => {
    test('WHEN/THEN: Debería mostrar un borde rojo y tomar una captura', async () => {
      // WHEN: Cuando el usuario ingresa un nombre de usuario inválido ("ThisIsWayTooLong1!")
      await page.type('#username', 'ThisIsWayTooLong1!');
      // THEN: Entonces el borde del campo de texto debería ser rojo
      await page.waitForSelector('#username[style*="border-color: red"]');
      // AND: Y se debería generar una captura de pantalla del error
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'error-largo.png') });
    });
  });

  describe('Scenario: El nombre de usuario no tiene mayúscula', () => {
    test('WHEN/THEN: Debería mostrar un borde rojo y tomar una captura', async () => {
      // WHEN: Cuando el usuario ingresa un nombre de usuario inválido ("nouppercase1!")
      await page.type('#username', 'nouppercase1!');
      // THEN: Entonces el borde del campo de texto debería ser rojo
      await page.waitForSelector('#username[style*="border-color: red"]');
      // AND: Y se debería generar una captura de pantalla del error
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'error-sin-mayuscula.png') });
    });
  });

  describe('Scenario: El nombre de usuario no tiene número', () => {
    test('WHEN/THEN: Debería mostrar un borde rojo y tomar una captura', async () => {
      // WHEN: Cuando el usuario ingresa un nombre de usuario inválido ("NoNumberUser!")
      await page.type('#username', 'NoNumberUser!');
      // THEN: Entonces el borde del campo de texto debería ser rojo
      await page.waitForSelector('#username[style*="border-color: red"]');
      // AND: Y se debería generar una captura de pantalla del error
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'error-sin-numero.png') });
    });
  });

  describe('Scenario: El nombre de usuario no tiene caracter especial', () => {
    test('WHEN/THEN: Debería mostrar un borde rojo y tomar una captura', async () => {
      // WHEN: Cuando el usuario ingresa un nombre de usuario inválido ("NoSpecialChar1")
      await page.type('#username', 'NoSpecialChar1');
      // THEN: Entonces el borde del campo de texto debería ser rojo
      await page.waitForSelector('#username[style*="border-color: red"]');
      // AND: Y se debería generar una captura de pantalla del error
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'error-sin-caracter-especial.png') });
    });
  });

  describe('Scenario: El nombre de usuario es válido', () => {
    test('WHEN/THEN: Debería mostrar un borde verde y tomar una captura', async () => {
      // WHEN: Cuando el usuario ingresa un nombre de usuario válido ("ValidUser1!")
      await page.type('#username', 'ValidUser1!');
      // THEN: Entonces el borde del campo de texto debería ser verde
      await page.waitForSelector('#username[style*="border-color: green"]');
      // AND: Y se debería generar una captura de pantalla de éxito
      await page.screenshot({ path: path.join(__dirname, 'screenshots', 'exito-valido.png') });
    });
  });

});