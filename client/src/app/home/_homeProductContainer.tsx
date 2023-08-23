"use client";
import { useEffect } from "react";
import { SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "../../components/productCard/_productCard";
import { fetchProductsHome } from "../../store/products/actionsProducts";
import { ProductState } from "../../store/products/typesProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FiltersHomeProps } from "./page";
import { salesByCustomer, salesDetails } from "@/store/sales/actionsSales";
import { SalesState } from "@/store/sales/typeSales";
import { fetchFavorites } from "@/store/favorites/actionsFavorites";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { LoginState } from "@/store/login/typeLogin";

const HomeProductContainer: React.FC<FiltersHomeProps> = ({
  productsFilter,
}) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 950px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1280px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const dispatch = useAppDispatch();
  const { material, colorId } = productsFilter;

  const { products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
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
    if (!products.length) dispatch(fetchProductsHome(material, colorId));
  }, [products]);

  useEffect(() => {
    dispatch(fetchFavorites(user.CustomerID));
    dispatch(fetchProjectsCustomer(user.CustomerID));
  }, [user]);

  return (
    <SimpleGrid
      pt={"8vh"}
      spacingY={10}
      px={isMediumScreen && !isSmallScreen ? "5%" : "10%"}
      w={"100%"}
      placeItems={"center"}
      columns={gridColumns}
      bg={"#f2f2f2"}
    >
      {homeProducts.length &&
        homeProducts.map((prod, index) => {
          return (
            <ProductCard product={prod} key={index} site={"home"} user={user} />
          );
        })}
    </SimpleGrid>
  );
};

export default HomeProductContainer;
