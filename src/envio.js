
export const COSTO_ENVIO_CENTAVOS = 7500;

export const UMBRAL_ENVIO_GRATIS_CENTAVOS = 50000;

export function calcularEnvio(subtotalCentavos, cantidadProductos) {
  if (!Number.isSafeInteger(subtotalCentavos)) {
    throw new TypeError(
      'El subtotal debe ser un entero seguro expresado en centavos.',
    );
  }

  if (subtotalCentavos < 0) {
    throw new RangeError('El subtotal no puede ser negativo.');
  }

  if (!Number.isSafeInteger(cantidadProductos)) {
    throw new TypeError(
      'La cantidad de productos debe ser un entero seguro.',
    );
  }

  if (cantidadProductos < 0) {
    throw new RangeError('La cantidad de productos no puede ser negativa.');
  }

  if (cantidadProductos === 0) {
    return 0;
  }

  if (subtotalCentavos >= UMBRAL_ENVIO_GRATIS_CENTAVOS) {
    return 0;
  }

  return COSTO_ENVIO_CENTAVOS;
}
