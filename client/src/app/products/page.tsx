"use client";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ProductActionTypes,
  ProductState,
} from "@/store/products/typesProducts";
import { useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Center,
  Select,
  HStack,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import MaterialCard from "./materialCard";

export default function Collections() {
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);

  return (
    <>
      <Center>
        <SimpleGrid
          w={"100vw"}
          m={"8vw"}
          mt={"4vh"}
          columns={4}
          spacingY={"30px"}
        >
          {materials &&
            materials.map((material, i) => {
              if (material !== "Fraanciaaa") {
                return (
                  <Box key={i}>
                    <MaterialCard material={material} />
                  </Box>
                );
              }
            })}
        </SimpleGrid>
      </Center>
    </>
  );
}
