"use client";
import { fetchColors } from "@/store/colors/actionsColors";
import { ColorsState } from "@/store/colors/typeColors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchMaterials,
  fetchProductsHome,
} from "@/store/products/actionsProducts";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiltersHomeProps } from "../page";
import { AiOutlineClear } from "react-icons/ai";

export function FiltersColors({
  setProductsFilter,
  productsFilter,
}: FiltersHomeProps) {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState("gray.500");
  const [activeButton, setActiveButton] = useState(null);
  const [smallerThan550] = useMediaQuery("(max-width: 550px)");
  const [smallerThan950] = useMediaQuery("(max-width: 950px)");
  const [boxMarginRight, setBoxMarginRight] = useState("auto");
  const [boxMargin, setBoxMargin] = useState(false);
  const [boxMl, setBoxMl] = useState("auto");
  const toast = useToast();
  const { colors } = useAppSelector(
    (state: { colorsReducer: ColorsState }) => state.colorsReducer
  );

  const homeColors = colors.slice(0, 5);

  useEffect(() => {
    if (!homeColors.length) dispatch(fetchColors());
  }, []);

  useEffect(() => {
    if (!smallerThan550) setBoxMargin(false);
    if (smallerThan550) setBoxMargin(true);
  }, [smallerThan550]);

  const handleClick = async (index) => {
    setActiveButton(index);
    setColor(homeColors[index].Color);
    setProductsFilter((prevState) => ({
      ...prevState,
      colorId: homeColors[index].ColorID.toString(),
    }));
    try {
      const products = await dispatch(
        fetchProductsHome(
          productsFilter.material,
          homeColors[index].ColorID.toString()
        )
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
      material: "",
      colorId: "",
    });
    dispatch(fetchProductsHome("", ""));
    setActiveButton(null);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      h={"260px"}
      w={"390px"}
      // bg={"yellow"}
      alignItems="center"
      justifyContent={"center"}
      mr={boxMargin ? "0px" : "200px"}
      flexDir={"row"}
    >
      <Box
        // bg={"red"}
        w={"250px"}
        h={"200px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={"2vw"}
        marginLeft={boxMargin ? "65px" : "0px"}
        // marginRight={"65px"}
      >
        <Box w={"240px"} p={"22px"}>
          <Center>
            <Heading fontSize="xl" fontWeight={"light"}>
              COLORS
            </Heading>
          </Center>
        </Box>
        <Center marginTop={3}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            w={"240px"}
            h={"40px"}
            minW={"220px"}
            // bg={"green"}
            // border={"2px solid red"}
          >
            {homeColors.map((c, index) => (
              <Button
                key={c.ColorID}
                aria-label={c.Color}
                background={c.Color}
                height={activeButton === index ? "38px" : "35px"}
                width={activeButton === index ? "38px" : "35px"}
                padding={0}
                minWidth="unset"
                borderRadius="50%"
                borderColor={activeButton === index ? "gray.700" : "primary"}
                borderWidth={activeButton === index ? "4px" : "0px"}
                boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.8)"}
                _active={{ borderColor: "black" }}
                _hover={{ background: c.Color }}
                onClick={() => handleClick(index)}
              ></Button>
            ))}
          </Box>
        </Center>
        <Center mt={"25px"}>Shop {color}</Center>
      </Box>
      <Box
        w={"full"}
        pl={"30px"}
        // bg={"yellow"}
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
