"use client";
import { useEffect } from "react";
import { SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "../../components/productCard/_productCard";
import { fetchProductsHome } from "../../store/products/actionsProducts";
import { ProductState } from "../../store/products/typesProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FiltersHomeProps } from "./page";
import { userInfo } from "@/store/login/actionsLogin";

const HomeProductContainer: React.FC<FiltersHomeProps> = ({
  productsFilter,
}) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 950px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1280px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const dispatch = useAppDispatch();
  const { material, colorId } = productsFilter;

  // const { user } = useAppSelector(
  //   (state: { loginReducer: LoginState }) => state.loginReducer
  // );

  const { products } = useAppSelector(
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

  return (
    <SimpleGrid
      pt={"8vh"}
      spacingY={6}
      px={isMediumScreen && !isSmallScreen ? "5%" : "10%"}
      w={"100%"}
      placeItems={"center"}
      columns={gridColumns} 
      bg={"#f2f2f2"}
    >
      {homeProducts.length &&
        homeProducts.map((prod) => {
          return (
            <ProductCard product={prod} key={prod.ProdNameID} site={"home"} />
          );
        })}
    </SimpleGrid>
  );
};

export default HomeProductContainer;
