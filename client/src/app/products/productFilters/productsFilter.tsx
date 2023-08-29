"use client";
import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "@/store/hooks";
import { ProductState } from "@/store/products/typesProducts";
import FiltersSize from "./filters_size";
import FiltersType from "./filters_type";
import FiltersFinish from "./filters_finish";
import FiltersThickness from "./filters_thickness";
import { FiltersState } from "./types";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchDimension } from "@/store/products/actionsProducts";
import { compareValues } from "@/utils/orderThickness";
import { sortedFractions } from "@/utils/orderFractionsThickness";

const ProductsFilters: React.FC<FiltersState> = ({
  handleCheckboxChange,
  params,
}) => {
  const dispatch = useAppDispatch();
  const { dimensions } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  useEffect(() => {
    if (!dimensions) dispatch(fetchDimension(params.Material));
  }, [dimensions]);

  const sortDimensionsType = dimensions?.Type.sort();
  const filterDimensionSize = dimensions?.Size.filter((el) => el !== null);
  const sortDimensionSize =
    filterDimensionSize && filterDimensionSize.sort(compareValues);
  const sortDimensionFinish = dimensions?.Finish.sort();
  const thicknessNotNull = dimensions?.Thickness.filter((el) => el !== null);
  const sortDimensionThickness = sortedFractions(thicknessNotNull);

  return (
    <>
      <Flex
        flexDir={"column"}
        w={"12vw"}
        minW={"12vw"}
        p={"15px"}
        h={"90vh"}
        overflow={"auto"}
        mt={"8vh"}
        ml={"1vw"}
      >
        {dimensions && (
          <>
            <FiltersType
              type={sortDimensionsType}
              handleCheckboxChange={handleCheckboxChange}
            />
            <FiltersSize
              size={sortDimensionSize}
              handleCheckboxChange={handleCheckboxChange}
            />
            <FiltersFinish
              finish={sortDimensionFinish}
              handleCheckboxChange={handleCheckboxChange}
            />
            <FiltersThickness
              thickness={sortDimensionThickness}
              handleCheckboxChange={handleCheckboxChange}
            />
          </>
        )}
      </Flex>
    </>
  );
};

export default ProductsFilters;
