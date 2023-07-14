"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMaterials } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function FiltersColors() {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState("gray.500");
  const colors = ["gray.500", "red.500", "gray.700", "green.500"];
  const [activeButton, setActiveButton] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [hightButton, setHightButton] = useState("50px");
  const [widthButton, setWidthButton] = useState("50px");

  const handleClick = (index) => {
    setActiveButton(index);
    setColor(colors[index]);
    setHightButton("50px");
    setWidthButton("50px");
  };

  console.log("soy activo", isActive);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      h={"full"}
      w={"30vw"}
      //   bg={"yellow"}
      alignItems="flex-start"
      justifyContent={"center"}
    >
      <Box w={"17vw"} h={"4vh"} p={"2vw"}>
        <Center>
          <Heading fontSize="xl" fontWeight={"light"}>
            COLORS
          </Heading>
        </Center>
      </Box>
      <Box
        // bg={"red"}
        w={"17vw"}
        h={"11vw"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={"2vw"}
      >
        <Center marginTop={3}>
          <SimpleGrid columns={4} spacing={2}>
            {colors.map((c, index) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height={activeButton === index ? "50px" : "40px"}
                width={activeButton === index ? "50px" : "40px"}
                padding={0}
                minWidth="unset"
                borderRadius="50%"
                borderColor={activeButton === index ? "black" : "primary"}
                borderWidth={activeButton === index ? "4px" : "0px"}
                _active={{ borderColor: "black" }}
                _hover={{ background: c }}
                onClick={() => {
                  handleClick(index);
                }}
              ></Button>
            ))}
          </SimpleGrid>
        </Center>
        <Center mt={"2vw"}>Shop {color}</Center>
      </Box>
    </Box>
  );
}
