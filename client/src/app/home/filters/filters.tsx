"use client";
import { Box, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { FiltersMaterials } from "./filtersMaterial";
import { FiltersColors } from "./filtersColors";
import { ProductsFilter } from "../page";

export interface FiltersProps {
  setProductsFilter: React.Dispatch<React.SetStateAction<ProductsFilter>>;
}

export function Filters({ setProductsFilter }: FiltersProps) {
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
          <FiltersMaterials setProductsFilter={setProductsFilter} />
          <FiltersColors />
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
          <FiltersMaterials setProductsFilter={setProductsFilter} />
          <FiltersColors />
        </Box>
      )}
    </>
  );
}
