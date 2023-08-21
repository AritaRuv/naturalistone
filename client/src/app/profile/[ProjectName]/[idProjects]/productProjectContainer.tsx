"use client";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useAppSelector } from "@/store/hooks";
import { FavoritesState } from "@/store/favorites/typesFavorites";
import ProductCard from "@/components/productCard/_productCard";


export default function ProductsProjectContainer() {

  const { project_favorites } = useAppSelector(
    (state: { favoritesReducer: FavoritesState }) => state.favoritesReducer
  );
  console.log(project_favorites);
  return (
    <>
      <SimpleGrid p={"5vh"} mt={"6vh"} spacingY={"2.5vh"} rounded={"sm"} w={"70vw"} h={"55vh"} columns={4} border={"2px solid red"} overflow={"auto"}>
        {
          project_favorites.length !== 0 && (
            typeof project_favorites !== "string" ? (
              project_favorites.map(prod => {
                return(
                  <ProductCard product={prod} site=""/>
                );
              })):(
              <Text>{project_favorites}</Text>
            )
          )
        }
      </SimpleGrid>
    </>
  );
}
