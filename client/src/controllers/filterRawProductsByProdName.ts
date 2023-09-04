import { RawProduct } from "@/store/products/typesProducts";
//funcion que recibe array de productos, y devuelve array de productos filtrados por prodNameID
function filterProductsByProdName(dataArray: RawProduct[], prodNameID: string): RawProduct[] {
  const filtered = dataArray.filter(prod => prod.ProdNameID === Number(prodNameID));
  return filtered;
}

export default filterProductsByProdName;