"use client";
import { useEffect } from "react";
import { SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "../products/_productCard";
import { fetchProducts } from "../../store/products/actionsProducts";
import { ProductState } from "../../store/products/typesProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface ComponentsProps {
  productsFilter: {
    color: string;
    material: string;
  };
}

const HomeProductContainer: React.FC<ComponentsProps> = ({
  productsFilter,
}) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 950px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1280px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const dispatch = useAppDispatch();
  const { material, color } = productsFilter;

  const { products, loading, error } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const homeProducts = products.slice(0, 4);

  let gridColumns = 4;
  if (isSmallScreen) {
    gridColumns = 2;
  }
  if (isExtraSmallScreen) {
    gridColumns = 1;
  }

  useEffect(() => {
    dispatch(fetchProducts(material));
  }, [material]);

  return (
    <SimpleGrid
      spacingY={6}
      py={"2%"}
      px={isMediumScreen && !isSmallScreen ? "5%" : "10%"}
      w={"100%"}
      placeItems={"center"}
      columns={gridColumns} // Establece el número de columnas dinámicamente
      bg={"#f2f2f2"}
    >
      {homeProducts.length &&
        homeProducts.map((prod) => {
          return <ProductCard product={prod} key={prod.ProdNameID} />;
        })}
    </SimpleGrid>
  );
};

export default HomeProductContainer;
