"use client";
import { fetchColors } from "@/store/colors/actionsColors";
import { ColorsState } from "@/store/colors/typeColors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductsHome,
} from "@/store/products/actionsProducts";
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiltersHomeProps } from "@/interfaces/home";
import { AiOutlineClear } from "react-icons/ai";
import { ProductState } from "@/store/products/typesProducts";

export function FiltersColors({
  setProductsFilter,
  productsFilter,
}: FiltersHomeProps) {
  const dispatch = useAppDispatch();
  //const [color, setColor] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [smallerThan550] = useMediaQuery("(max-width: 550px)");
  const [smallerThan950] = useMediaQuery("(max-width: 950px)");
  const [boxMargin, setBoxMargin] = useState(false);
  const toast = useToast();

  const { colors } = useAppSelector(
    (state: { colorsReducer: ColorsState }) => state.colorsReducer
  );

  const { raw_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const homeColors = colors.slice(0, 5);

  const handleClick = async (index) => {
    setActiveButton(index);
    //setColor(homeColors[index].Color);
    setProductsFilter((prevState) => ({
      ...prevState,
      colorName: homeColors[index],
    }));
    try {
      const products = await dispatch(
        fetchProductsHome(productsFilter.material,homeColors[index],raw_products)
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
      console.log("error en dispatch", error);
    }
  };

  const handleClear = () => {
    setProductsFilter({
      material: "Terrazzo",
      colorName: "",
      materialValue: "",
    });
    dispatch(fetchProductsHome("Terrazzo", "", raw_products));
    setActiveButton(null);
  };

  useEffect(() => {
    if (!smallerThan550) setBoxMargin(false);
    if (smallerThan550) setBoxMargin(true);
  }, [smallerThan550]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      mr={boxMargin ? "0px" : "200px"}
      flexDir={"row"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginLeft={boxMargin ? "65px" : "0px"}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          w={"240px"}
          h={"40px"}
          minW={"220px"}
        >
          {homeColors.map((c, index) => (
            <Button
              key={index}
              aria-label={c}
              background={c}
              height={activeButton === index ? "38px" : "35px"}
              width={activeButton === index ? "38px" : "35px"}
              padding={0}
              minWidth="unset"
              borderRadius="50%"
              borderColor={activeButton === index ? "gray.700" : "primary"}
              borderWidth={activeButton === index ? "4px" : "0px"}
              boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.8)"}
              _active={{ borderColor: "black" }}
              _hover={{ background: c }}
              onClick={() => handleClick(index)}
            ></Button>
          ))}
        </Box>
      </Box>
      <Box
        w={"full"}
        pl={"30px"}
        mt={smallerThan950 ? "20px" : 0}
      >
        <IconButton
          aria-label="User-icon"
          variant="unstyled"
          fontSize="xl"
          border={"none"}
          title={"Clear filters"}
          icon={<AiOutlineClear />}
          onClick={handleClear}
        ></IconButton>
      </Box>
    </Box>
  );
}
