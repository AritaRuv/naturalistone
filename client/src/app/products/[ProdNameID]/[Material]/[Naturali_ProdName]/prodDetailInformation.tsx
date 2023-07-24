"use client";
import React, { useEffect } from "react";
import {
  Box, Flex, Text, useMediaQuery
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductState } from "@/store/products/typesProducts";
import { fetchProductsValues } from "@/store/products/actionsProducts";
import AddProductToCart from "@/app/products/addToCartDropdown";
import AddSampleProductToCart from "@/app/products/addSampleToCartDropdown";
import ProdDetailName from "./prodDetailName";


export default function ProdDetailInformation({ params }) {

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");
  const { ProdNameID } = params;

  const { productValues } = useAppSelector((state: { productReducer: ProductState }) => state.productReducer);

  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(!productValues.hasOwnProperty(ProdNameID)) {
        dispatch(fetchProductsValues({ ProdNameID }));
      }
  },[])

  return (
    <>
      <Flex flexDir={'column'} w={!smallerThan740 ? '50%' : '100%'} h={!smallerThan740 ? '500px' : '300px'} minH={'300px'}>
        <Box w={!smallerThan740 ? '90%' : '100%'} minW={'520px'}>
          {
          !smallerThan740 ?
            <ProdDetailName params={params}/>
            : null
          }
          {
            productValues.hasOwnProperty(ProdNameID) ?  
            <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} mt={!smallerThan740 ? 0 : 10}>
              <AddSampleProductToCart ProdNameID={ProdNameID} productValues={productValues}/>
              <AddProductToCart ProdNameID={ProdNameID} productValues={productValues}/>
            </Box>
            : null
          }
          </Box>
      </Flex>
    </>
  );
}