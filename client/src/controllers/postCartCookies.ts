import { RawProduct } from "@/store/products/typesProducts";

export const postCartCookies = (product: RawProduct) => {

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