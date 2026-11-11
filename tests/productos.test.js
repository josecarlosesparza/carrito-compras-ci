
import { describe, expect, it } from 'vitest';
import { agregarProducto } from '../src/productos.js';

describe('agregarProducto', () => {
  it('agrega un producto a un carrito vacio', () => {
    const resultado = agregarProducto([], {
      id: 1,
      nombre: 'Teclado',
      precioCentavos: 15000,
      cantidad: 2,
    });

    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(2);
    expect(resultado[0].precioCentavos).toBe(15000);
  });

  it('acumula la cantidad de un producto existente', () => {
  const carrito = [
      { id: 1, nombre: 'Teclado', precioCentavos: 15000, cantidad: 2 },
      { id: 2, nombre: 'Mouse', precioCentavos: 8000, cantidad: 1 },
  ];

  const resultado = agregarProducto(carrito, {
    id: 1,
    nombre: 'Teclado',
    precioCentavos: 15000,
    cantidad: 3,
  });

  expect(resultado).toHaveLength(2);
  expect(resultado[0].cantidad).toBe(5);
  expect(resultado[1].cantidad).toBe(1);
  expect(resultado[1].id).toBe(2);
 });


  it('agrega productos con identificadores diferentes', () => {
    const carrito = [
      { id: 1, nombre: 'Teclado', precioCentavos: 15000, cantidad: 1 },
    ];

    const resultado = agregarProducto(carrito, {
      id: 2,
      nombre: 'Mouse',
      precioCentavos: 8000,
      cantidad: 1,
    });

    expect(resultado).toHaveLength(2);
  });

  it('permite agregar productos gratuitos', () => {
    const resultado = agregarProducto([], {
      id: 1,
      nombre: 'Muestra',
      precioCentavos: 0,
      cantidad: 1,
    });

    expect(resultado[0].precioCentavos).toBe(0);
  });

  it('no modifica el carrito original', () => {
    const carrito = [
      { id: 1, nombre: 'Teclado', precioCentavos: 15000, cantidad: 2 },
    ];

    agregarProducto(carrito, {
      id: 1,
      nombre: 'Teclado',
      precioCentavos: 15000,
      cantidad: 3,
    });

    expect(carrito[0].cantidad).toBe(2);
  });

  it('rechaza un carrito que no sea un arreglo', () => {
    expect(() => agregarProducto(null, {
      id: 1,
      precioCentavos: 1000,
      cantidad: 1,
    })).toThrow(TypeError);
  });

  it('rechaza un producto nulo', () => {
    expect(() => agregarProducto([], null)).toThrow(TypeError);
  });

  it('rechaza un identificador invalido', () => {
    expect(() => agregarProducto([], {
      id: '',
      precioCentavos: 1000,
      cantidad: 1,
    })).toThrow(TypeError);
  });

  it('rechaza un precio que no sea entero', () => {
    expect(() => agregarProducto([], {
      id: 1,
      precioCentavos: 10.5,
      cantidad: 1,
    })).toThrow(TypeError);
  });

  it('rechaza un precio negativo', () => {
    expect(() => agregarProducto([], {
      id: 1,
      precioCentavos: -100,
      cantidad: 1,
    })).toThrow(RangeError);
  });

  it('rechaza una cantidad decimal', () => {
    expect(() => agregarProducto([], {
      id: 1,
      precioCentavos: 1000,
      cantidad: 1.5,
    })).toThrow(TypeError);
  });

  it('rechaza una cantidad igual a cero', () => {
    expect(() => agregarProducto([], {
      id: 1,
      precioCentavos: 1000,
      cantidad: 0,
    })).toThrow(RangeError);
  });

  it('rechaza una cantidad negativa', () => {
    expect(() => agregarProducto([], {
      id: 1,
      precioCentavos: 1000,
      cantidad: -2,
    })).toThrow(RangeError);
  });
});
