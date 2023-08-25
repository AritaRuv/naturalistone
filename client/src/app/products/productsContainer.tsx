"use client";
import { SimpleGrid, useMediaQuery, Box, Center, Text } from "@chakra-ui/react";
import ProductCard from "../../components/productCard/_productCard";
import { ProductState } from "../../store/products/typesProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchFavorites } from "@/store/favorites/actionsFavorites";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { LoginState } from "@/store/login/typeLogin";
import { userInfo } from "@/store/login/actionsLogin";
import { Path } from "./path";

const ProductsContainer = ({ params }) => {
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

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

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
    dispatch(fetchFavorites(user.CustomerID));
    dispatch(fetchProjectsCustomer(user.CustomerID));
  }, [user]);

  return (
    <Box>
      {typeof products_filters !== "string" ? (
        <Box
          h={"80vh"}
          overflow={"auto"}
          py={"2%"}
          px={'3%'}
          w={ is1200Screen ? "100vw" : "86vw"}>
          <SimpleGrid
            justifyItems={"center"}
            spacingY={"6vh"}
            spacingX={"60px"}
            columns={gridColumns} // Establece el número de columnas dinámicamente
          >
            {products_filters.length !== 0
              ? products_filters.map((prod, i) => {
                return (
                  <Box key={i}>
                    <ProductCard
                      product={prod}
                      key={prod.ProdNameID}
                      site={"products"}
                      user={user}
                    />
                  </Box>
                );
              })
              : products_by_material?.length !== 0
                ? products_by_material?.slice(0, 20).map((prod, i) => {
                  return (
                    <Box key={i}>
                      <ProductCard
                        product={prod}
                        key={prod.ProdNameID}
                        site={"products"}
                        user={user}
                      />
                    </Box>
                  );
                })
                : null}
          </SimpleGrid>
        </Box>
      ) : (
        <Center w={"full"} h={"87vh"}>
          <Text fontSize={"1.4rem"} fontWeight={"thin"}>
            No products found
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default ProductsContainer;
