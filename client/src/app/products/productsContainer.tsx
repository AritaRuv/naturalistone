/* eslint-disable indent */
"use client";
import { SimpleGrid, useMediaQuery, Box, Center, Text } from "@chakra-ui/react";
import ProductCard from "../../components/productCard/_productCard";
import { ProductState } from "../../store/products/typesProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Filters } from "./productFilters/types";
import { useEffect } from "react";
import { fetchFavorites } from "@/store/favorites/actionsFavorites";
import { useDispatch } from "react-redux";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";

const ProductsContainer: React.FC<Filters> = () => {
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 550px)");
  const [isSmallScreen] = useMediaQuery("(max-width: 1000px)");
  const [is1200Screen] = useMediaQuery("(max-width: 1200px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1400px)");
  const [isLargeScreen] = useMediaQuery("(max-width: 1650px)");
  const dispatch = useAppDispatch();

  const { products_filters } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const { products_by_material } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  console.log("filtersssssss", products_filters);

  let gridColumns = 5;

  if (isLargeScreen) {
    gridColumns = 4;
  }
  if (isMediumScreen) {
    gridColumns = 3;
  }
  if (isSmallScreen) {
    gridColumns = 2;
  }
  if (isExtraSmallScreen) {
    gridColumns = 1;
  }

  useEffect(() => {
    dispatch(fetchFavorites(3999));
    dispatch(fetchProjectsCustomer(3999));
  }, []);

  return (
    <>
      {typeof products_filters !== "string" ? (
        <SimpleGrid
          zIndex={1}
          position={"fixed"}
          left={!is1200Screen ? "20vw" : 0}
          top={"10vh"}
          spacingY={"10vh"}
          py={"2%"}
          w={is1200Screen ? "80vw" : "80vw"}
          columns={gridColumns} // Establece el número de columnas dinámicamente
          h={"100%"}
          minH={"90vh"}
          overflow={"auto"}
        >
          {products_filters.length !== 0
            ? products_filters.map((prod) => {
                return (
                  <Box>
                    <ProductCard
                      product={prod}
                      key={prod.ProdNameID}
                      site={"products"}
                    />
                  </Box>
                );
              })
            : products_by_material?.length !== 0
            ? products_by_material?.slice(0, 20).map((prod) => {
                return (
                  <Box>
                    <ProductCard
                      product={prod}
                      key={prod.ProdNameID}
                      site={"products"}
                    />
                  </Box>
                );
              })
            : null}
        </SimpleGrid>
      ) : (
        <Center w={"full"} h={"90vh"}>
          <Text fontSize={"20px"}>No products found</Text>
        </Center>
      )}
    </>
  );
};

export default ProductsContainer;
