"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import { Box, Select, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { ProductsFilter } from "../page";
import { FiltersProps } from "./filters";

export function FiltersMaterials({ setProductsFilter }: FiltersProps) {
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const [smallerThan550] = useMediaQuery("(max-width: 550px)");
  const [boxMarginLeft, setBoxMarginLeft] = useState("auto");

  useEffect(() => {
    if (smallerThan550) setBoxMarginLeft("none");
  }, [smallerThan550]);

  const handleClick = (event) => {
    setProductsFilter({
      colorId: "",
      material: event.target.value,
    });
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
          onClick={handleClick}
          icon={<MdOutlineArrowDropDownCircle />}
        >
          {materials?.map((material, index) => (
            <option key={index} value={material}>
              {material}
            </option>
          ))}
          {/* <option value="MATERIALS">MATERIALS</option>
          <option value="Terrazzo">Terrazzo</option>
          <option value="Porcelain">Porcelain</option>
          <option value="Marble">Marble</option>
          <option value="Quartzite">Quartzite</option>
          <option value="Granite">Granite</option>
          <option value="">Basalt</option> */}
        </Select>
      </Box>
    </Box>
  );
}
