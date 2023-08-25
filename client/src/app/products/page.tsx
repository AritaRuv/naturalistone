"use client";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  ProductState,
} from "@/store/products/typesProducts";
import { useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Center,
  useMediaQuery
} from "@chakra-ui/react";
import MaterialCard from "./materialCard";

export default function Collections() {
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const [smallerThan1800] = useMediaQuery("(max-width: 1800px)");
  const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);

  return (
    <>
      <Center >
        <SimpleGrid
          mt={smallerThan1200 ? "8vh" : "12vh"}
          columns={  
                    smallerThan1800 ? 
                      smallerThan1200 ? 
                       smallerThan740 ? 1 : 2 
                      : 3 
                    : 4 
                  }
          spacingY={"40px"}
          spacingX={"60px"}
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
