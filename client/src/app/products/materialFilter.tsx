"use client";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";

const MaterialFilter: React.FC = () => {
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    dispatch(fetchMaterials())
  },[])

  return (
    <SimpleGrid
      spacingY={6}
      py={"2%"}
      px={ "10%"}
      w={"100%"}
      placeItems={"center"}
      //columns={} // Establece el número de columnas dinámicamente
      bg={"white"}
    >

    </SimpleGrid>
  );
};

export default MaterialFilter;

