"use client";
import { Flex } from "@chakra-ui/react";
import { useAppSelector } from "@/store/hooks";
import { ProductState } from "@/store/products/typesProducts";
import FiltersSize from "./filters_size";
import FiltersType from "./filters_type";
import FiltersFinish from "./filters_finish";
import FiltersThickness from "./filters_thickness";
import { FiltersState } from "./types";


const ProductsFilters: React.FC<FiltersState> = ({ handleCheckboxChange}) => {

  const { dimensions } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );


  return (
    <>
      <Flex
        flexDir={"column"} 
        w={"12vw"} 
        p={"15px"} 
        position={"fixed"} 
        h={"85vh"} 
        top={"12vh"} 
        left={"2vw"} 
        overflow={"auto"}
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

