"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMaterials,
  fetchProductsHome,
} from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import {
  Box,
  Select,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PiCaretDownThin } from "react-icons/pi";
import { FiltersHomeProps } from "@/interfaces/home";

export function FiltersMaterials({
  setProductsFilter,
  productsFilter,
}: FiltersHomeProps) {
  const dispatch = useAppDispatch();

  const { materials, raw_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const [smallerThan550] = useMediaQuery("(max-width: 550px)");
  const [boxMarginLeft, setBoxMarginLeft] = useState("auto");
  const toast = useToast();

  useEffect(() => {
    if (smallerThan550) setBoxMarginLeft("none");
  }, [smallerThan550]);

  const handleClick = async (event) => {
    setProductsFilter((prevState) => ({
      ...prevState,
      material: event.target.value,
      materialValue: event.target.value,
    }));
    try {
      const products = await dispatch(
        fetchProductsHome(event.target.value, productsFilter.colorName, raw_products)
      );
      if (!products) {
        if (!toast.isActive("toastProductsId")) {
          return toast({
            id: "toastProductsId",
            title: "Products not found",
            duration: 4000,
            status: "error",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.log("error in filter material products");
    }
  };

  return (
    <Box
      display={"flex"}
      h={"100px"}
      w={"300px"}
      alignItems={"center"}
      justifyContent={"center"}
      
    >
      <Select
        name="materials"
        id="material"
        w={"180px"}
        bg={"none"}
        fontWeight={"light"}
        fontSize={"0.9rem"}
        border={"none"}
        onChange={handleClick}
        value={productsFilter.materialValue}
        icon={<PiCaretDownThin />}
      >
        <option value="">ALL MATERIALS</option>
        {materials?.map((material, i) => (
          <option value={material} key={i}>
            {material}
          </option>
        ))}
      </Select>
    </Box>
  );
}
