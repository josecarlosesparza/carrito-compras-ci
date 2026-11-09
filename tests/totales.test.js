import { describe, expect, it } from 'vitest';
import { calcularSubtotal, calcularTotal } from '../src/totales.js';

const producto = { precioCentavos: 14999, cantidad: 1 };
const dosUnidades = { precioCentavos: 14999, cantidad: 2 };
const complemento = { precioCentavos: 2500, cantidad: 1 };
const productoGratis = { precioCentavos: 0, cantidad: 1 };

describe('calcularSubtotal', () => {
  it.each([
    ['un carrito vacío', [], 0],
    ['un producto', [producto], 14999],
    ['dos unidades del mismo producto', [dosUnidades], 29998],
    ['dos productos distintos', [producto, complemento], 17499],
    ['un producto gratis', [productoGratis], 0],
  ])('calcula el subtotal para %s', (_caso, productos, esperado) => {
    expect(calcularSubtotal(productos)).toBe(esperado);
  });
});

describe('calcularTotal', () => {
  it.each([
    ['sin opciones', [producto], undefined, 14999],
    ['con descuento', [producto], { descuentoCentavos: 2000 }, 12999],
    ['con envío', [producto], { envioCentavos: 5000 }, 19999],
    [
      'con descuento y envío',
      [producto],
      { descuentoCentavos: 2000, envioCentavos: 5000 },
      17999,
    ],
    ['con descuento igual al subtotal', [producto], { descuentoCentavos: 14999 }, 0],
    ['con descuento mayor al subtotal', [producto], { descuentoCentavos: 20000 }, 0],
    [
      'con descuento mayor al subtotal y envío',
      [producto],
      { descuentoCentavos: 20000, envioCentavos: 5000 },
      5000,
    ],
    ['con carrito vacío y envío', [], { envioCentavos: 5000 }, 0],
  ])('calcula el total %s', (_caso, productos, opciones, esperado) => {
    expect(calcularTotal(productos, opciones)).toBe(esperado);
  });
});