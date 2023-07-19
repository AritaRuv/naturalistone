"use client";
import { fetchColors } from "@/store/colors/actionsColors";
import { ColorsState } from "@/store/colors/typeColors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import { Box, Button, Center, Heading, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function FiltersColors() {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState("gray.500");
  // const colors = ["black", "white.500", "gray.500", "green.500", "blue.600"];
  const [activeButton, setActiveButton] = useState(null);
  const [smallerThan550] = useMediaQuery("(max-width: 550px)");
  const [boxMarginRight, setBoxMarginRight] = useState("auto");
  const [boxMargin, setBoxMargin] = useState(false);
  const [boxMl, setBoxMl] = useState("auto");
  const { colors } = useAppSelector(
    (state: { colorsReducer: ColorsState }) => state.colorsReducer
  );

  const homeColors = colors.slice(0, 5);

  useEffect(() => {
    dispatch(fetchColors());
  }, []);

  useEffect(() => {
    if (!smallerThan550) setBoxMargin(false);
    if (smallerThan550) setBoxMargin(true);
  }, [smallerThan550]);

  const handleClick = (index) => {
    setActiveButton(index);
    setColor(homeColors[index].Color);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      h={"260px"}
      w={"390px"}
      // bg={"yellow"}
      alignItems="flex-start"
      justifyContent={"center"}
      mr={boxMargin ? "0px" : "200px"}
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
        <Box w={"240px"} h={"4vh"} p={"2vw"}>
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
            minW={"220px"}
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
                onClick={() => {
                  handleClick(index);
                }}
              ></Button>
            ))}
          </Box>
        </Center>
        <Center mt={"25px"}>Shop {color}</Center>
      </Box>
    </Box>
  );
}
