interface Product {
    ProductName: string;
    Material: string;
    Type: string;
    Size: string;
    Thickness: string;
    Finish: string;
    Price: number;
    ProdID: number;
    Discontinued_Flag: string;
  }

function filtrarProductos(array: Product[]): Product[] {
    const productos: {[key: string]: Product } = {};
  
    array.forEach((producto) => {
      const productName = producto.ProductName;
  
      if (!productos.hasOwnProperty(productName)) {
        productos[productName] = producto;
      }
    });
  
    const resultado = Object.values(productos);
  
    return resultado;
  }