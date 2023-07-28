"use client";
import { Box, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { FiltersMaterials } from "./filtersMaterial";
import { FiltersColors } from "./filtersColors";
import { FiltersHomeProps } from "../page";


export function Filters({ setProductsFilter, productsFilter }: FiltersHomeProps ) {
  const [smallerThan550] = useMediaQuery("(max-width: 550px)");

  return (
    <>
      {!smallerThan550 ? (
        <Box
          display={"flex"}
          h={"70vh"}
          w={"full"}
          bg={"#f2f2f2"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"row"}
        >
          <FiltersMaterials setProductsFilter={setProductsFilter} productsFilter={productsFilter} />
          <FiltersColors setProductsFilter={setProductsFilter} productsFilter={productsFilter} />
        </Box>
      ) : (
        <Box
          display={"flex"}
          h={"70vh"}
          w={"full"}
          bg={"#f2f2f2"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column-reverse"}
        >
          <FiltersMaterials setProductsFilter={setProductsFilter} productsFilter={productsFilter} />
          <FiltersColors setProductsFilter={setProductsFilter} productsFilter={productsFilter} />
        </Box>
      )}
    </>
  );
}
