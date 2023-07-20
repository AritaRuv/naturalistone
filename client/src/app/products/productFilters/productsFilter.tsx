"use client";
import { SimpleGrid,useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDimension } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import FiltersSize from "./filters_size";
import FiltersType from "./filters_type";
import FiltersFinish from "./filters_finish";
import { FiltersState } from "./types";


const ProductsFilters: React.FC<FiltersState> = ({filters, setFilters, handleCheckboxChange}) => {

  const { dimensions } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const dispatch = useAppDispatch()
  const [is1200Screen] = useMediaQuery("(max-width: 1200px)");

  useEffect(()=>{
    dispatch(fetchDimension())
  },[])

  return (
    <>
    <SimpleGrid w={'15vw'} p={'15px'} position={'fixed'} h={'73.5vh'} top={!is1200Screen ? '26vh' :'10vh'} spacingY={2} >
      {
        dimensions && (
          <>
            <FiltersType type={dimensions.Type} handleCheckboxChange={handleCheckboxChange}/>
            <FiltersSize size={dimensions.Size} handleCheckboxChange={handleCheckboxChange}/>
            <FiltersFinish finish={dimensions.Finish} handleCheckboxChange={handleCheckboxChange}/>
          </>
        )
      }
      
    </SimpleGrid>
    </>
  );
};

export default ProductsFilters;

