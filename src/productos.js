
export function agregarProducto(carrito, producto) {
  if (!Array.isArray(carrito)) {
    throw new TypeError('El carrito debe ser un arreglo.');
  }

  if (!producto || typeof producto !== 'object' || Array.isArray(producto)) {
    throw new TypeError('El producto debe ser un objeto válido.');
  }

  const { id, precioCentavos, cantidad } = producto;

  if (
    !(
      (typeof id === 'string' && id.trim() !== '') ||
      (typeof id === 'number' && Number.isFinite(id))
    )
  ) {
    throw new TypeError('El producto debe tener un ID válido.');
  }

  if (!Number.isInteger(precioCentavos)) {
    throw new TypeError('El precio debe ser un número entero.');
  }

  if (precioCentavos < 0) {
    throw new RangeError('El precio no puede ser negativo.');
  }

  if (!Number.isInteger(cantidad)) {
    throw new TypeError('La cantidad debe ser un número entero.');
  }

  if (cantidad <= 0) {
    throw new RangeError('La cantidad debe ser mayor que cero.');
  }

  const productoExistente = carrito.find(
    (item) => item.id === id,
  );

  if (productoExistente) {
    return carrito.map((item) =>
      item.id === id
        ? { ...item, cantidad: item.cantidad + cantidad }
        : item,
    );
  }

  return [...carrito, { ...producto }];
}
