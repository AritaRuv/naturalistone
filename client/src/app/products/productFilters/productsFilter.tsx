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

const ProductsFilters: React.FC<FiltersState> = ({ handleCheckboxChange, params}) => {
  const dispatch = useAppDispatch();
  const { dimensions } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  useEffect(()=>{
    if(!dimensions) dispatch(fetchDimension(params.Material)); 
  },[dimensions]);

  return (
    <>
      <Flex
        flexDir={"column"} 
        w={"12vw"} 
        p={"15px"} 
        h={"90vh"} 
        overflow={"auto"}
        mt={"8vh"}
        ml={"1vw"}
      >
        {
          dimensions && (
            <>
              <FiltersType type={dimensions.Type} handleCheckboxChange={handleCheckboxChange}  />
              <FiltersSize size={dimensions.Size} handleCheckboxChange={handleCheckboxChange} />
              <FiltersFinish finish={dimensions.Finish} handleCheckboxChange={handleCheckboxChange} />
              <FiltersThickness thickness={dimensions.Thickness} handleCheckboxChange={handleCheckboxChange} />
            </>
          )
        }
      
      </Flex>
    </>
  );
};

export default ProductsFilters;

