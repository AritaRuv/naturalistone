import { bodyCart } from "@/store/cart/actionsCart";
import { RawProduct } from "@/store/products/typesProducts";

export const postCartCookies = (raw_products: RawProduct[], body: bodyCart) => {
  const product = raw_products.find((product) => {
    return (
      product.ProdNameID === body.ProdNameID &&
      product.Size === body.size &&
      product.Finish === body.finish &&
      product.Thickness === body.thickness 
    );
  });
  const productCookies = {
    ...product,
    Quantity: 1,
    CustomerID: 0,
    idCartEntry: 0
  };
  const arrayProducts: any = window && JSON.parse(
    localStorage.getItem("cartProducts") || "[]"
  );
  arrayProducts.push(productCookies);
  localStorage.setItem("cartProducts", JSON.stringify(arrayProducts));
  return arrayProducts;
};