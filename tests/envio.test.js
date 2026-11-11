
import { describe, expect, it } from 'vitest';

import { calcularEnvio } from '../src/envio.js';

describe('calcularEnvio', () => {
  it.each([
    ['carrito vacío', 0, 0, 0],
    ['un centavo', 1, 1, 7500],
    ['compra de 250 pesos', 25000, 1, 7500],
    ['un centavo debajo del límite', 49999, 1, 7500],
    ['exactamente en el límite', 50000, 1, 0],
    ['un centavo arriba del límite', 50001, 1, 0],
    ['compra muy superior al límite', 120000, 3, 0],
    ['producto gratuito en un carrito no vacío', 0, 1, 7500],
  ])(
    'calcula correctamente el envío: %s',
    (_caso, subtotal, cantidad, esperado) => {
      expect(calcularEnvio(subtotal, cantidad)).toBe(esperado);
    },
  );

  it.each([
    ['subtotal decimal', 100.5, 1, TypeError],
    ['subtotal negativo', -1, 1, RangeError],
    ['cantidad decimal', 1000, 1.5, TypeError],
    ['cantidad negativa', 1000, -1, RangeError],
    ['cantidad indefinida', 1000, undefined, TypeError],
  ])(
    'rechaza los datos incorrectos: %s',
    (_caso, subtotal, cantidad, errorEsperado) => {
      expect(() => calcularEnvio(subtotal, cantidad)).toThrow(errorEsperado);
    },
  );
});
