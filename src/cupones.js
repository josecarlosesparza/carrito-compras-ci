/**
 * ESCUELA10 descuenta el 10 % desde 10000 centavos de subtotal.
 * El código admite espacios exteriores y diferencias de mayúsculas.
 * Los descuentos se redondean al centavo más cercano; medio centavo sube.
 */
export function calcularDescuento(codigo, subtotalCentavos) {
  if (typeof codigo !== 'string') {
    throw new TypeError('El código del cupón debe ser una cadena.');
  }

  if (!Number.isSafeInteger(subtotalCentavos) || subtotalCentavos < 0) {
    throw new RangeError('El subtotal debe ser un entero seguro no negativo en centavos.');
  }

  if (codigo.trim().toUpperCase() !== 'ESCUELA10' || subtotalCentavos < 10000) {
    return 0;
  }

  return Math.round(subtotalCentavos / 10);
}
