"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import { Box, Select, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export function FiltersMaterials() {
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  console.log("soy materials", materials);

  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);

  return (
    <Box
      display={"flex"}
      h={"full"}
      w={"10vw"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        display={"flex"}
        h={"10vh"}
        w={"20vw"}
        // bg={"blue"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Select name="materials" id="material" w={"10vw"} bg={"none"}>
          {/* {materials?.map((material) => (
            <option value="material">{material}</option>
          ))} */}
          <option value="Material">Material</option>
          <option value="">Terrazzo</option>
          <option value="">Porcelain</option>
          <option value="">Marble</option>
          <option value="">Quartzite</option>
          <option value="">Granite</option>
          <option value="">Basalt</option>
        </Select>
      </Box>
    </Box>
  );
}
