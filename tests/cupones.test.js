import { describe, expect, it } from 'vitest';
import { calcularDescuento } from '../src/cupones.js';
import { calcularTotal } from '../src/totales.js';

describe('calcularDescuento', () => {
  it('descuenta el 10 % con un cupón válido', () => {
    expect(calcularDescuento('ESCUELA10', 20000)).toBe(2000);
  });

  it('devuelve cero para un cupón desconocido', () => {
    expect(calcularDescuento('OTRO', 20000)).toBe(0);
    expect(calcularDescuento('', 20000)).toBe(0);
  });

  it('aplica el descuento en el mínimo exacto', () => {
    expect(calcularDescuento('ESCUELA10', 10000)).toBe(1000);
  });

  it('devuelve cero por debajo del mínimo, incluido un subtotal cero', () => {
    expect(calcularDescuento('ESCUELA10', 9999)).toBe(0);
    expect(calcularDescuento('ESCUELA10', 0)).toBe(0);
  });

  it('redondea hacia abajo una fracción menor a medio centavo', () => {
    expect(calcularDescuento('ESCUELA10', 10004)).toBe(1000);
  });

  it('redondea medio centavo hacia arriba', () => {
    expect(calcularDescuento('ESCUELA10', 10005)).toBe(1001);
  });

  it('admite espacios exteriores y minúsculas en el código', () => {
    expect(calcularDescuento(' escuela10 ', 20000)).toBe(2000);
  });

  it('entrega centavos enteros compatibles con calcularTotal y el envío', () => {
    const productos = [{ precioCentavos: 10005, cantidad: 1 }];
    const descuentoCentavos = calcularDescuento('ESCUELA10', 10005);

    expect(Number.isInteger(descuentoCentavos)).toBe(true);
    expect(calcularTotal(productos, { descuentoCentavos, envioCentavos: 500 })).toBe(9504);
  });

  it('rechaza códigos que no sean cadenas', () => {
    for (const codigo of [undefined, null, 10, {}, []]) {
      expect(() => calcularDescuento(codigo, 20000)).toThrow(TypeError);
    }
  });

  it('rechaza subtotales negativos', () => {
    expect(() => calcularDescuento('ESCUELA10', -1)).toThrow(RangeError);
  });

  it('rechaza subtotales con fracciones de centavo', () => {
    expect(() => calcularDescuento('ESCUELA10', 10000.5)).toThrow(RangeError);
  });

  it('rechaza valores no finitos y enteros no seguros', () => {
    for (const subtotal of [NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => calcularDescuento('ESCUELA10', subtotal)).toThrow(RangeError);
    }
  });

  it('rechaza subtotales de otros tipos incluso con un cupón desconocido', () => {
    for (const subtotal of ['20000', null, undefined, true, {}]) {
      expect(() => calcularDescuento('OTRO', subtotal)).toThrow(RangeError);
    }
  });
});
