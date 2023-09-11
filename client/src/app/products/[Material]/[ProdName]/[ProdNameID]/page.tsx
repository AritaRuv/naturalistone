"use client";
import { useEffect } from "react";
import ProdDetailContainer from "./prodDetailContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductsByMaterial, fetchProductsByProdNameID } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import { Box } from "@chakra-ui/react";
import ProdDetailCarousel from "./prodDetailCarrusel";
import ProdDetailInformation from "./prodDetailInformation";


export default function Detail({params}) {


  const dispatch = useAppDispatch();
  const { raw_products, raw_products_by_material } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  useEffect(()=>{
    if(raw_products.length == 0) dispatch(fetchProductsByMaterial(params.Material));
    if(raw_products_by_material.length == 0 && raw_products) dispatch(fetchProductsByProdNameID(raw_products, params.ProdNameID));
  },[raw_products]);
  console.log(raw_products_by_material);
  return (
    <Box w={"100%"} display={"flex"} flexDir={"row"} >
      <ProdDetailCarousel params={params}/>
      <ProdDetailInformation params={params} raw_products_by_material={raw_products_by_material}/>
    </Box> 
  );
}