"use client";
import { useEffect } from "react";
import { FilterProps, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "../products/_productCard";
import { fetchProductsHome } from "../../store/products/actionsProducts";
import { ProductState } from "../../store/products/typesProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FiltersHomeProps } from "./page";
import { LoginState } from "@/store/login/typeLogin";
import { userInfo } from "@/store/login/actionsLogin";

const HomeProductContainer: React.FC<FiltersHomeProps> = ({
  productsFilter,
  setProductsFilter,
}) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 950px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1280px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const dispatch = useAppDispatch();
  const { material, colorId } = productsFilter;

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const { products, loading, error } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  let gridColumns = 4;
  if (isSmallScreen) {
    gridColumns = 2;
  }
  if (isExtraSmallScreen) {
    gridColumns = 1;
  }
  const homeProducts = products.slice(0, 4);

  useEffect(() => {
    dispatch(userInfo());
    if (!products.length) dispatch(fetchProductsHome(material, colorId));
  }, [products]);

  console.log({ products });

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
      {products.length
        ? homeProducts.map((prod, i) => {
            return <ProductCard product={prod} key={i} />;
          })
        : null}
    </SimpleGrid>
  );
};

export default HomeProductContainer;
