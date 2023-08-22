"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMaterials,
  fetchProductsHome,
} from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import {
  Box,
  Button,
  Select,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { FiltersHomeProps } from "../page";

export function FiltersMaterials({
  setProductsFilter,
  productsFilter,
}: FiltersHomeProps) {
  const dispatch = useAppDispatch();

  const { materials } = useAppSelector(
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
        fetchProductsHome(event.target.value, productsFilter.colorId)
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

  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);

  return (
    <Box
      display={"flex"}
      h={"100px"}
      w={"300px"}
      // minW={""}
      alignItems={"center"}
      justifyContent={"center"}
      // marginLeft={"auto"}
      // bg={"green"}
    >
      <Box
        display={"flex"}
        h={"80px"}
        w={"220px"}
        minW={"220px"}
        // bg={"blue"}
        alignItems={"center"}
        justifyContent={"center"}
        marginLeft={boxMarginLeft}
      >
        <Select
          name="materials"
          id="material"
          w={"140px"}
          bg={"none"}
          border={"none"}
          onChange={handleClick}
          value={productsFilter.materialValue}
          icon={<MdOutlineArrowDropDownCircle />}
        >
          <option value="">All Materials</option>
          {materials?.map((material, i) => (
            <option value={material} key={i}>
              {material}
            </option>
          ))}
        </Select>
      </Box>
    </Box>
  );
}
