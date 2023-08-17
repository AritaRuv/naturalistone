"use client";
import { SimpleGrid, useMediaQuery, Box } from "@chakra-ui/react";
import ProductCard from "../../components/productCard/_productCard";
import { ProductState } from "../../store/products/typesProducts";
import { useAppSelector } from "../../store/hooks";
import { Filters } from "./productFilters/types";



const ProductsContainer: React.FC<Filters> = () => {
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 550px)");
  const [isSmallScreen] = useMediaQuery("(max-width: 1000px)");
  const [is1200Screen] = useMediaQuery("(max-width: 1200px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1400px)");
  const [isLargeScreen] = useMediaQuery("(max-width: 1650px)");

  const { products_filters } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const { products_by_material } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
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

  return (
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
      {products_filters.length !== 0 ? (
        products_filters.map((prod) => {
          return (
            <Box>
              <ProductCard product={prod} key={prod.ProdNameID} site={"products"} />
            </Box>
          );
        })
      ) : (
        products_by_material?.length !== 0 ? (
          products_by_material?.slice(0, 20).map((prod) => {
            return (
              <Box>
                <ProductCard product={prod} key={prod.ProdNameID} site={"products"} />
              </Box>
            );
          })
        ) : (null)
      )
      }
    </SimpleGrid>
  );
};

export default ProductsContainer;
