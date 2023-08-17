
"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import ProductsFilters from "../productFilters/productsFilter";
import ProductsContainer from "../productsContainer";
import FilterButtons from "../productFilters/filters_buttons";
import { useState } from "react";
import FiltersDropDownMenu from "../productFilters/filters_dropDownMenu";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDimension, fetchProductsByMaterial } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import { Filters } from "../productFilters/types";
import { fetchProductsFilters } from "@/store/products/actionsProducts";



export default function Products({params}) {

  // Flag para evitar que  dispatch(fetchProductsFilters(products_by_material, filters)) se despache en el primer renderizado
  const [shouldTriggerEffect, setShouldTriggerEffect] = useState(false);

  const { dimensions } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const { raw_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    if(!dimensions) dispatch(fetchDimension(params.Material));
    dispatch(fetchProductsByMaterial(params.Material)); 
  },[]);

  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");
  const [showMenu, setShowMenu] = useState("");
  const [filters, setFilters] = useState<Filters>({
    material: params.Material,
    type: [],
    finish: [],
    thickness: [],
    size: [],
  });
  const handleCheckboxChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      
      if (!(filterName in updatedFilters)) {
        updatedFilters[filterName] = [];
      }
      const isValueSelected = updatedFilters[filterName].includes(value);
  
      if (isValueSelected) {
        updatedFilters[filterName] = updatedFilters[filterName].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[filterName] = [...updatedFilters[filterName], value];
      }
      return updatedFilters;
    });
   
  };

  useEffect(() => {
    // Activa el efecto solo si shouldTriggerEffect es true
    if (shouldTriggerEffect) {
      dispatch(fetchProductsFilters(raw_products, filters));
    } else {
      // Cambia shouldTriggerEffect a true después del primer renderizado
      setShouldTriggerEffect(true);
    }
  }, [filters, shouldTriggerEffect]);

  return (
    <>
      <Box h={"93vh"}>
        {
          !isSmallScreen ? (
            <>
              <Box display={"flex"} flexDir={"row"} w={"100vw"}>
                <ProductsFilters setFilters={setFilters} filters={filters} handleCheckboxChange={handleCheckboxChange}/>
                <ProductsContainer {...filters} />
              </Box>
            </> 
          ):(
            <>
              <FilterButtons setFilters={setFilters} filters={filters} setShowMenu={setShowMenu} showMenu={showMenu}/>
              {
                showMenu !== "" && (
                  <FiltersDropDownMenu setShowMenu={setShowMenu} showMenu={showMenu} finish={dimensions?.Finish} size={dimensions?.Size} materials={materials} thickness={dimensions?.Thickness} type={dimensions?.Type}/>              
                )
              }
              <Box zIndex={2}>
                <ProductsContainer {...filters} />
              </Box>
            </>
          )
        }
        
      </Box>
    </>
  );
}
