"use client";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/store/hooks";
import { FavoritesState } from "@/store/favorites/typesFavorites";
import ProductCard from "@/components/productCard/_productCard";


export default function ProductsProjectContainer() {

  const { project_favorites } = useAppSelector(
    (state: { favoritesReducer: FavoritesState }) => state.favoritesReducer
  );
  return (
    <>
      <Box w={"75vw"} h={"65vh"} overflow={"auto"} p={"20px"} >
        <SimpleGrid justifyItems="center" spacingY={"20px"} rounded={"sm"} columns={4}>
          {
            project_favorites.length !== 0 && (
              typeof project_favorites !== "string" ? (
                project_favorites.map(prod => {
                  return(
                    <ProductCard product={prod}/>
                  );
                })):(
                <Text>{project_favorites}</Text>
              )
            )
          }
        </SimpleGrid>
      </Box>
    </>
  );
}
