"use client";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { FiltersMaterials } from "./filtersMaterial";
import { FiltersColors } from "./filtersColors";
import { FiltersHomeProps } from "@/interfaces/home";


export function Filters({ setProductsFilter, productsFilter }: FiltersHomeProps ) {
  const [smallerThan550] = useMediaQuery("(max-width: 550px)");

  return (
    <>
      {!smallerThan550 ? (
        <Box
          display={"flex"}
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          pt={"10vh"}
          
        >
          <Text fontSize={"0.9rem"} fontWeight={"light"}>
            QUICK SEARCH
          </Text>
          <Box display={"flex"} flexDir={"row"} alignItems={"center"} mt={"2vh"}>
            <FiltersMaterials setProductsFilter={setProductsFilter} productsFilter={productsFilter} />
            <FiltersColors setProductsFilter={setProductsFilter} productsFilter={productsFilter} />
          </Box>
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
