"use client";
import {
  Box,
  Select,
  useMediaQuery,
} from "@chakra-ui/react";
import ProductsFilters from "../productFilters/productsFilter";
import ProductsContainer from "../productsContainer";
import { useState } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ClearDimension,
  ClearProductFilters,
  ClearProductsByMaterial,
  fetchDimension,
  fetchProductsByMaterial,
  fetchProductsFilters,
} from "@/store/products/actionsProducts";
import {
  ProductState,
} from "@/store/products/typesProducts";
import { Filters } from "../productFilters/types";
import { PiCaretDownThin } from "react-icons/pi";
import { Path } from "../path";

export default function Products({ params }) {
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

  useEffect(() => {
    if (!dimensions) dispatch(fetchDimension(params.Material));
    dispatch(fetchProductsByMaterial(params.Material));

    return () => {
      dispatch(ClearDimension());
      dispatch(ClearProductFilters());
      dispatch(ClearProductsByMaterial());
    };
  }, []);

  const [smallerThan1800] = useMediaQuery("(max-width: 1800px)");
  const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const [showMenu, setShowMenu] = useState("");

  const [filters, setFilters] = useState<Filters>({
    material: params.Material,
    type: [],
    finish: [],
    thickness: [],
    size: [],
    orderBy: ""
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
    setShouldTriggerEffect(true);
  };
  const handleChangeOrderBy = (e) => {
    setFilters({ ...filters, orderBy: e.target.value });
    setShouldTriggerEffect(true);
  };

  useEffect(() => {
    // Activa el efecto solo si shouldTriggerEffect es true
    if (shouldTriggerEffect) {
      dispatch(fetchProductsFilters(raw_products, filters));
    }
  }, [filters, shouldTriggerEffect]);



  return (
    <>
      <Box h={"100vh"} w={"100%"} display={"flex"} flexDir={"row"}>
        {
        // smallerThan1200 ? 
        //   <FiltersDropDownMenu
        //       showMenu={showMenu}
        //       setShowMenu={setShowMenu}
        //       handleCheckboxChange={handleCheckboxChange}
        //       params={params} 
        //       setFilters={setFilters}
        //       filters={filters}/>
        //   :
          !smallerThan1200 ? 
            <ProductsFilters
              setFilters={setFilters}
              filters={filters}
              handleCheckboxChange={handleCheckboxChange}
              params={params}
            />
            : null
        }
        <Box>
          <Box w={"85vw"} px={"1vw"} h={"12vh"} display={"flex"} justifyContent={"space-between"} alignItems={"flex-end"}>
            <Path params={params}/>
            <Select
              icon={<PiCaretDownThin />}
              w={"7vw"}
              minW={"120px"}
              fontSize={"0.8rem"}
              h={"16px"}
              placeholder="ORDER BY"
              fontWeight={"light"}
              focusBorderColor="none"
              border={"none"}
              name="s"
              onChange={(e) => handleChangeOrderBy(e)}
            >
              <option value="AZ"> A-Z </option>
              <option value="ZA"> Z-A</option>
            </Select>
          </Box>
          <ProductsContainer params={params} />
        </Box>
      </Box> 
    </>
  );
}
