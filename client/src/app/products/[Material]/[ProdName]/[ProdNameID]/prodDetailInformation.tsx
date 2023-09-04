"use client";
import React, { useEffect } from "react";
import {
  Box, Flex, useMediaQuery, TableContainer, Table, Tbody, Tr, Td
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductState, RawProduct } from "@/store/products/typesProducts";
import { fetchProductsValues } from "@/store/products/actionsProducts";
import ProdDetailName from "./prodDetailName";


export default function ProdDetailInformation({ params, raw_products_by_material }) {

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");
  const { ProdNameID } = params;

  const { productValues } = useAppSelector((state: { productReducer: ProductState }) => state.productReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productValues || !(ProdNameID in productValues)) {
      dispatch(fetchProductsValues({ ProdNameID }));
    }
  }, []);
  

  return (
    <>
      <Flex flexDir={"column"} w={"75vw"}>
        <Box pt={"20vh"} pl={"5vh"}>
          <ProdDetailName params={params}/>
          <Box w={"24vw"} mt={"5vh"}>
            <TableContainer>
              <Table size={"sm"} variant={"unstyled"}>
                <Tbody>
                  {
                    raw_products_by_material.length > 0 ? (
                      raw_products_by_material.map((prod: RawProduct, i:number) => {
                        console.log(prod);
                        return(
                          <Tr key={i}>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>{prod.Type}</Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>{prod.Size}</Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>{prod.Thickness}</Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>{prod.Finish}</Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>$ {prod.SalePrice}</Td>
                          </Tr>
                        );
                      })
                    ):(
                      null
                    )
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

        </Box>

      </Flex>
    </>
  );
}