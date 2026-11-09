export function calcularSubtotal(productos) {
  return productos.reduce(
    (subtotal, { precioCentavos, cantidad }) =>
      subtotal + precioCentavos * cantidad,
    0,
  );
}

export function calcularTotal(
  productos,
  { descuentoCentavos = 0, envioCentavos = 0 } = {},
) {
  if (productos.length === 0) {
    return 0;
  }

  const subtotal = calcularSubtotal(productos);
  const subtotalConDescuento = Math.max(0, subtotal - descuentoCentavos);

  return subtotalConDescuento + envioCentavos;
}