// jest.setup.js

// Mockea la función getContext para que las pruebas no fallen en jsdom
HTMLCanvasElement.prototype.getContext = () => ({
  fillRect: () => {},
  clearRect: () => {},
  getImageData: () => ({ data: [] }),
  putImageData: () => {},
  createImageData: () => ({ data: [] }),
  setTransform: () => {},
  drawImage: () => {},
  save: () => {},
  fillText: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  arc: () => {},
  fill: () => {},
  measureText: () => ({ width: 0 }),
});

// Mockea otras propiedades si tu código las necesita (ancho/alto)
Object.defineProperty(HTMLCanvasElement.prototype, 'width', {
  writable: true,
  value: 500,
});
Object.defineProperty(HTMLCanvasElement.prototype, 'height', {
  writable: true,
  value: 300,
});