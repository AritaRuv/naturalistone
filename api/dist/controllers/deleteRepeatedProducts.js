function filtrarProductos(array) {
    const productos = {};
    array.forEach((producto) => {
        const productName = producto.ProductName;
        if (!productos.hasOwnProperty(productName)) {
            productos[productName] = producto;
        }
    });
    const resultado = Object.values(productos);
    return resultado;
}
