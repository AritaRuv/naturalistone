/* eslint-disable indent */
/* eslint-disable quotes */
"use client";
import {
  Box,
  Flex,
  HStack,
  Select,
  Spacer,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";
import ProductsFilters from "../productFilters/productsFilter";
import ProductsContainer from "../productsContainer";
import FilterButtons from "../productFilters/filters_buttons";
import { useState } from "react";
import FiltersDropDownMenu from "../productFilters/filters_dropDownMenu";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ClearDimension,
  ClearMaterials,
  ClearProductFilters,
  ClearProductsByMaterial,
  fetchDimension,
  fetchProductsByMaterial,
  fetchProductsFilters,
} from "@/store/products/actionsProducts";
import {
  ProductActionTypes,
  ProductState,
} from "@/store/products/typesProducts";
import { Filters } from "../productFilters/types";

import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";

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

  const { products_by_material } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  console.log("soy materials", materials);
  console.log("soy dimensions", dimensions);
  console.log("soy raw_products", raw_products);
  console.log("soy products_by_material", products_by_material);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!dimensions) dispatch(fetchDimension(params.Material));
    dispatch(fetchProductsByMaterial(params.Material));

    return () => {
      dispatch(ClearDimension());
      dispatch(ClearMaterials());
      dispatch(ClearProductFilters());
      dispatch(ClearProductsByMaterial());
    };
  }, []);

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

  const handleChangeOrderBy = (e) => {
    filtrar(e.target.value);
  };

  const filtrar = (criterio: string) => {
    if (criterio === "AZ") {
      products_by_material?.sort((p1, p2) =>
        p1.Naturali_ProdName > p2.Naturali_ProdName
          ? 1
          : p1.Naturali_ProdName < p2.Naturali_ProdName
          ? -1
          : 0
      );
    } else {
      products_by_material?.sort((p1, p2) =>
        p1.Naturali_ProdName < p2.Naturali_ProdName
          ? 1
          : p1.Naturali_ProdName > p2.Naturali_ProdName
          ? -1
          : 0
      );
    }
    try {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_BY_MATERIAL,
        payload: products_by_material,
      });
    } catch (error) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        error: "Error al obtener los product values",
      });
    }
  };

  return (
    <>
      <Box h={"93vh"}>
        <Box
          pl={"80px"}
          w={"full"}
          display={"flex"}
          flexDir={"row"}
          h={"30px"}
          // bg={"green"}
          justifyContent={"space-between"}
          // alignItems={"flex-start"}
        >
          <Box>
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="/home" fontSize={"0.7rem"}>
                  HOME
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="/products" fontSize={"0.7rem"}>
                  COLLECTIONS
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  href="#"
                  fontSize={"0.7rem"}
                  fontWeight={"semibold"}
                >
                  {decodeURIComponent(params.Material.toUpperCase())}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Flex p="4">
            <Spacer />
            <HStack>
              <Text w="100%" align={"end"}>
                order by
              </Text>
              <Select
                placeholder="Select option"
                name="s"
                onChange={(e) => handleChangeOrderBy(e)}
              >
                <option value="AZ"> A-Z </option>
                <option value="ZA"> Z-A</option>
              </Select>
            </HStack>
          </Flex>
        </Box>

        {!isSmallScreen ? (
          <>
            <Box display={"flex"} flexDir={"row"} w={"100vw"}>
              <ProductsFilters
                setFilters={setFilters}
                filters={filters}
                handleCheckboxChange={handleCheckboxChange}
              />
              <ProductsContainer {...filters} />
            </Box>
          </>
        ) : (
          <>
            <FilterButtons
              setFilters={setFilters}
              filters={filters}
              setShowMenu={setShowMenu}
              showMenu={showMenu}
            />
            {showMenu !== "" && (
              <FiltersDropDownMenu
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                finish={dimensions?.Finish}
                size={dimensions?.Size}
                materials={materials}
                thickness={dimensions?.Thickness}
                type={dimensions?.Type}
              />
            )}
            <Box zIndex={2}>
              <ProductsContainer {...filters} />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
