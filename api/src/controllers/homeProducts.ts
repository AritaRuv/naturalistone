import { ProductHome } from "../interfaces/products";
import { RowDataPacket } from "mysql2";


//funcion que recibe array de productos, y devuelve array de prodNames sin repetir
function getProductsByProdName(dataArray: RowDataPacket[]): ProductHome[] {
  const resultMap: { [key: string]: boolean } = {};
  const resultArray: ProductHome[] = [];

  for (const obj of dataArray) {
    const { Naturali_ProdName, Material, ProdNameID } = obj;
    const key = `${Naturali_ProdName}-${Material}-${ProdNameID}`;

    if (!resultMap[key]) {
      resultMap[key] = true;
      resultArray.push({ Naturali_ProdName, Material, ProdNameID });
    }
  }

  return resultArray;
}

export default getProductsByProdName;