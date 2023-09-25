import { Filters } from "@/interfaces/filtersProducts";
import { RawProduct } from "@/store/products/typesProducts";
import getProductsByProdName from "./productByProdName";

export const getProductsFiltered = (arrayProducts: RawProduct[], filters: Filters) => {
  const filtered = arrayProducts.filter((product) => {
    // const materialCondition =
    //   filters.material === "all" ? true : product.Material === filters.material;
    const typeCondition =
      filters.type.length === 0 || filters.type.includes(product.Type);
    const finishCondition =
      filters.finish.length === 0 || filters.finish.includes(product.Finish);
    const thicknessCondition =
      filters.thickness.length === 0 ||
      filters.thickness.includes(product.Thickness);
    const sizeCondition =
      product.Size === "0" || filters.size.length === 0 || filters.size.includes(product.Size);
    return (
      typeCondition && finishCondition && thicknessCondition && sizeCondition
    );
  });

  if (!filtered.length) {
    return "";
  }
  const result = getProductsByProdName(filtered);

  if (filters.orderBy === "" || filters.orderBy === "AZ") {
    result?.sort((p1, p2) =>
      p1.Naturali_ProdName > p2.Naturali_ProdName
        ? 1
        : p1.Naturali_ProdName < p2.Naturali_ProdName
          ? -1
          : 0
    );
  } else {
    result?.sort((p1, p2) =>
      p1.Naturali_ProdName < p2.Naturali_ProdName
        ? 1
        : p1.Naturali_ProdName > p2.Naturali_ProdName
          ? -1
          : 0
    );
  }

  return result;
};



export const getProductsHomeFiltered = (arrayProducts: RawProduct[], material:string, color:string) => {
  const filtered = arrayProducts.filter((product) => {
    // const materialCondition =
    //   filters.material === "all" ? true : product.Material === filters.material;
    const materialCondition =
      material.length === 0 || material.includes(product.Material);
    const colorCondition =
        color.length === 0 || color.includes(product.ColorName);
    return (
      colorCondition && materialCondition 
    );
  });

  const result = getProductsByProdName(filtered);

  return result;
};
