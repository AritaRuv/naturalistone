import { Filters } from "@/app/products/productFilters/types";
import { RawProduct } from "@/store/products/typesProducts";
import getProductsByProdName from "./productByProdName";

const getProductsFiltered = (arrayProducts: RawProduct[], filters: Filters) => {

  const filtered = arrayProducts.filter(product => {
    const materialCondition = product.Material === filters.material;
    const typeCondition = filters.type.length === 0 || filters.type.includes(product.Type);
    const finishCondition = filters.finish.length === 0 || filters.finish.includes(product.Finish);
    const thicknessCondition = filters.thickness.length === 0 || filters.thickness.includes(product.Thickness);
    const sizeCondition = filters.size.length === 0 || filters.size.includes(product.Size);

    return materialCondition && typeCondition && finishCondition && thicknessCondition && sizeCondition;
  });
  const result = getProductsByProdName(filtered);

  if (filters.orderBy === "" || filters.orderBy === "AZ") {
    result?.sort(
      (p1, p2) => (p1.Naturali_ProdName > p2.Naturali_ProdName) ? 1 : (p1.Naturali_ProdName < p2.Naturali_ProdName) ? -1 : 0);
  }
  else {
    result?.sort(
      (p1, p2) => (p1.Naturali_ProdName < p2.Naturali_ProdName) ? 1 : (p1.Naturali_ProdName > p2.Naturali_ProdName) ? -1 : 0);
  }

  return result;
};

export default getProductsFiltered;