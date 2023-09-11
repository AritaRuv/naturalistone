"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Box, Flex, useMediaQuery, TableContainer, Table, Tbody, Tr, Td, Checkbox, Text, Center, Input, Button, InputGroup, InputRightAddon
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductState, RawProduct } from "@/store/products/typesProducts";
import { fetchProductsValues } from "@/store/products/actionsProducts";
import ProdDetailName from "./prodDetailName";
import { ProductDetail } from "@/interfaces/product";


export default function ProdDetailInformation({ params, raw_products_by_material }) {

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1); 
  const [product, setProduct] = useState<ProductDetail>({
    ProdID: null,
    Quantity: null,
    Material: "",
    Size: "",
    Thickness: "",
    Finish: "",
    Type: ""
  });
  const { ProdNameID } = params;
  const { productValues } = useAppSelector((state: { productReducer: ProductState }) => state.productReducer);

  const dispatch = useAppDispatch();

  const handleProductCheck = (index:number) => {
    
    setSelectedProductIndex(index);
    setProduct({
      ...product,
      ProdID: raw_products_by_material[index].ProdID,
      Size: raw_products_by_material[index].Size,
      Thickness: raw_products_by_material[index].Thickness,
      Finish: raw_products_by_material[index].Finish,
      Type: raw_products_by_material[index].Type,
      Material: raw_products_by_material[index].Material
    });
  };
  
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
          <Box display={"flex"} flexDir={"row"} w={"60vw"} mt={"5vh"} justifyContent={"space-between"}>
            <TableContainer >
              <Table size={"sm"} variant={"unstyled"}>
                <Tbody>
                  {
                    raw_products_by_material.length > 0 ? (
                      raw_products_by_material.map((prod: RawProduct, i:number) => {

                        return(
                          <Tr key={i}>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}><Checkbox
                              colorScheme='whiteAlpha'
                              iconColor="orange"
                              borderColor={"blackAlpha.400"}
                              isChecked={selectedProductIndex === i}
                              onChange={()=>handleProductCheck(i)}/></Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>{prod.Type}</Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>{prod.Size}</Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>{prod.Thickness}</Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>{prod.Finish}</Td>
                            <Td fontSize={"0.9rem"} fontWeight={"thin"}>$ {prod.SalePrice ? prod.SalePrice : "-"}</Td>
                            <Td fontSize={"0.8rem"} textAlign={"center"} fontWeight={"thin"}>IN STOCK</Td>
                            <Td w={"150px"} position={"absolute"}>
                              {
                                (selectedProductIndex === i) && (
                                  <Box w={"130px"} display={"flex"} top={"-15px"} alignItems={"flex-end"} position={"relative"}>  
                                    <InputGroup>
                                      <Input
                                        fontSize={"0.9rem"}
                                        border={"0.5px solid"}
                                        borderColor={"transparent"}
                                        //borderBottomColor={"logo.grey"}
                                        fontWeight={"hairline"}
                                        rounded={"none"}
                                        focusBorderColor="logo.orange"
                                        _focus={{
                                          border: "0.5px"
                                        }}
                                        _placeholder={{
                                          fontWeight: "hairline",
                                          textAlign: "center"
                                        }} />
                                      <InputRightAddon bg={"transparent"}  border={"none"}  fontSize={"0.65rem"} fontWeight={"thin"} children={"SQ FT"}/>
                                    </InputGroup>             
                                  </Box> 
                                )
                              }
                              
                            </Td>
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
            <Box 
              display={"flex"}  
              alignContent={"center"} 
              justifyContent={"center"} 
              flexDir={"column"} 
              mr={"15vw"}
            >
              <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
                <Center display={"flex"} w={"120px"} h={"120px"} flexDir={"column"} alignItems={"center"} border={"0.5px solid black"}>
                  <Input
                    isReadOnly
                    w={"100px"}
                    fontSize={"2.5rem"} 
                    border={"none"}
                    fontWeight={"hairline"}
                    placeholder="1"
                    rounded={"none"}
                    _placeholder={{
                      fontWeight: "hairline",
                      textAlign: "center"
                    }}/>
                  <Text 
                    mt={"15px"} 
                    fontSize={"0.8rem"} 
                    fontWeight={"thin"}>
                    {product.Type === "Slab" ? "UNITS" 
                      : product.Material === "Porcelain" ? "BOXES" : "TILES"}</Text>
                </Center>
                <Button
                  mt={"10px"} 
                  display={"flex"}
                  variant={"unstyled"}
                  fontWeight={"thin"}
                  fontSize={"0.9rem"}
                  textAlign={"end"}
                  _hover={{
                    fontWeight: "normal",
                    color:"logo.orange"
                  }}
                >+ADD TO CART</Button>
              </Box>
            </Box>
          </Box>
          
        </Box>

      </Flex>
    </>
  );
}