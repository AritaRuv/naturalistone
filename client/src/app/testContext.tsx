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

export function TestContext({children}) {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
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

  const sessionId = Cookies.get("sessionId");
  
  useEffect(() => {
    if(sessionId){
      if(user.CustomerID === 0) dispatch(userInfo());
    } 
  }, [user, sessionId]);
  
  // useEffect(() => {
  //   dispatch(fetchCart());
  // }, [cart]);

  useEffect(() => {
    if(user?.CustomerID !== 0){
      if(typeof favorites === "string" ) dispatch(fetchFavorites(user?.CustomerID));
      if(typeof customerProjects === "string") dispatch(fetchProjectsCustomer(user.CustomerID));
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

