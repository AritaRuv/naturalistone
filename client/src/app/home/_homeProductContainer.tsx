"use client";
import { useEffect, useContext } from "react";
import { SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProductCard from "../../components/productCard/_productCard";
import { fetchProductsHome } from "../../store/products/actionsProducts";
import { ProductState } from "../../store/products/typesProducts";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FiltersHomeProps } from "./page";
import { fetchFavorites } from "@/store/favorites/actionsFavorites";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { LoginState } from "@/store/login/typeLogin";
import { userInfo } from "@/store/login/actionsLogin";
import { AppContext } from "../appContext";
import Cookies from "js-cookie";

const HomeProductContainer: React.FC<FiltersHomeProps> = ({
  productsFilter,
}) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 800px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1200px)");
  const [isXLargeScreen] = useMediaQuery("(max-width: 1800px)");
  const [isLargeScreen] = useMediaQuery("(max-width: 1550px)");
  const [isExtraSmallScreen] = useMediaQuery("(max-width: 620px)");
  const dispatch = useAppDispatch();
  const { material, colorId } = productsFilter;

  const appContext = useContext(AppContext);

  const { products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  useEffect(() => {
    dispatch(userInfo());
  }, []);

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

  const homeProducts = products.slice(0, gridColumns > 4 ? gridColumns : 4);

  useEffect(() => {
    if (!products.length) dispatch(fetchProductsHome(material, colorId));
  }, [products]);

  useEffect(() => {
    dispatch(fetchFavorites(user.CustomerID));
    dispatch(fetchProjectsCustomer(user.CustomerID));
  }, [user]);

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      appContext && appContext.setUserLog(true);
    } else {
      appContext && appContext.setUserLog(false);
    }
  }, []);

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
      {homeProducts.length !== 0 &&
        homeProducts.map((prod, index) => {
          return (
            <ProductCard product={prod} key={index} site={"home"} user={user} />
          );
        })}
    </SimpleGrid>
  );
};

export default HomeProductContainer;
