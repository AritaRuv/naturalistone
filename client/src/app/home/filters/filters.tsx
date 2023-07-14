"use client";
import { Box, Stack, Text } from "@chakra-ui/react";
import { FiltersMaterials } from "./filtersMaterial";
import { FiltersColors } from "./filtersColors";

export function Filters() {
  return (
    <Box
      display={"flex"}
      h={"70vh"}
      w={"full"}
      bg={"#f2f2f2"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <FiltersMaterials />
      <FiltersColors />
    </Box>
  );
}
