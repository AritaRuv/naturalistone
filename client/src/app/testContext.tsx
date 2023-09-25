"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginState } from "@/store/login/typeLogin";
import { userInfo } from "@/store/login/actionsLogin";
import { fetchFavorites } from "@/store/favorites/actionsFavorites";
import { FavoritesState } from "@/store/favorites/typesFavorites";
import { ProjectsState } from "@/store/projects/typeProjects";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import Cookies from "js-cookie";
import { SalesState } from "@/store/sales/typeSales";
import { fetchSalesByCustomer } from "@/store/sales/actionsSales";
import { CartState } from "@/store/cart/typesCart";
import { fetchCart } from "@/store/cart/actionsCart";
import { fetchMaterials, fetchProductsHome, fetchRawProduct } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import { fetchColors } from "@/store/colors/actionsColors";
import { ColorsState } from "@/store/colors/typeColors";

export function TestContext({children}) {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  const { materials, raw_products, home_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const { favorites } = useAppSelector(
    (state: { favoritesReducer: FavoritesState }) => state.favoritesReducer
  );
  const { customerProjects } = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer
  );
  const { salesCustomer } = useAppSelector(
    (state: { salesReducer: SalesState }) => state.salesReducer
  );
  const { cart } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );
  const { colors } = useAppSelector(
    (state: { colorsReducer: ColorsState }) => state.colorsReducer
  );

  const sessionId = Cookies.get("sessionId");
  
  useEffect(() => {
    if(sessionId){
      if(user.CustomerID === 0) dispatch(userInfo());
    } 
  }, [user, sessionId]);
  
  useEffect(() => {
    if(typeof cart === "string") dispatch(fetchCart());
    if(materials.length === 0) dispatch(fetchMaterials());
    if(raw_products.length === 0) dispatch(fetchRawProduct());
    if(colors.length  === 0 ) dispatch(fetchColors());
    if(typeof home_products === "string" && raw_products.length) dispatch(fetchProductsHome("Terrazzo","",raw_products));
  }, [cart, materials, raw_products, colors, home_products]);

  useEffect(() => {
    if(user?.CustomerID !== 0){ 
      if(typeof favorites === "string" ) dispatch(fetchFavorites());
      if(typeof customerProjects === "string") dispatch(fetchProjectsCustomer());
      //if(typeof salesCustomer === "string") dispatch(fetchSalesByCustomer(user.CustomerID));
    }else{
      dispatch(fetchCart());
    }
  }, [user, favorites, customerProjects]);

  return(
    <>
      {children}
    </>
  );
}

