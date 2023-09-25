"use client";
import { Box, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "../../components/productCard/_productCard";
import { useAppSelector } from "../../store/hooks";
import { ProductState } from "@/store/products/typesProducts";
import { useEffect } from "react";

const HomeProductContainer: React.FC= () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 800px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1200px)");
  const [isXLargeScreen] = useMediaQuery("(max-width: 1800px)");
  const [isLargeScreen] = useMediaQuery("(max-width: 1550px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 620px)");

  const { home_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  let gridColumns = 6;

  if (isXLargeScreen) {
    gridColumns = 5;
  }
  if (isMediumScreen) {
    gridColumns = 4;
  }
  if (isSmallScreen) {
    gridColumns = 2;
  }
  if (isLargeScreen) {
    gridColumns = 4;
  }
  if (isExtraSmallScreen) {
    gridColumns = 1;
  }

  let homeProducts=typeof home_products !== "string" ? home_products.slice(0, gridColumns > 4 ? gridColumns : 4) : [];
  
  useEffect(()=>{
    homeProducts = typeof home_products !== "string" ? home_products.slice(0, gridColumns > 4 ? gridColumns : 4) : [];
  },[ home_products]);

  return (
    <SimpleGrid
      pt={"8vh"}
      spacingY={10}
      px={isMediumScreen && !isSmallScreen ? "15%" : "5%"}
      w={"100%"}
      placeItems={"center"}
      columns={gridColumns}
      minH={"500px"}
    >
      {
        homeProducts?.length !== 0 && (
          homeProducts?.map((prod, index) => {

            return (
              <Box key={index}>
                <ProductCard product={prod} key={index} site={"home"}/>
              </Box>
            );
          }))}
    </SimpleGrid>
  );
};

export default HomeProductContainer;
