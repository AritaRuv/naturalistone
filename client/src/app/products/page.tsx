"use client";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductActionTypes, ProductState } from "@/store/products/typesProducts";
import { useEffect } from "react";
import { SimpleGrid, Box, Center, Select, HStack, Flex, Spacer, Text } from "@chakra-ui/react";
import MaterialCard from "./materialCard";


export default function Collections() {
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);

  const handleChangeOrderBy = (e) => {
    filtrar(e.target.value)
  }

  const filtrar = (criterio: String) => {
    try {
      if (criterio === "AZ" || criterio === "")
        materials.sort()
      else
        materials.reverse()
      dispatch({
        type: ProductActionTypes.FETCH_MATERIALS,
        payload: materials,
      });
    } catch (error) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        error: "Error al obtener los product values",
      });
    }
  }

  return (
    <>
      <Flex p='4'>
        <Spacer />
        <HStack>
          <Text as='h6' size='sm'>
            order by
          </Text>
          <Select placeholder='Select option' name="s" onChange={(e) => handleChangeOrderBy(e)}>
            <option value='AZ'> A-Z </option>
            <option value='ZA'> Z-A</option>
          </Select>
        </HStack>
      </Flex >
      <Center>
        <SimpleGrid w={"100vw"} m={"8vw"} mt={"4vh"} columns={4} spacingY={"30px"}>

          {
            materials && (
              materials.map((material, i) => {
                if (material !== "Fraanciaaa") {
                  return (
                    <Box key={i}>
                      <MaterialCard material={material} />
                    </Box>
                  );
                }

              }))
          }
        </SimpleGrid>
      </Center>
    </>
  );
}