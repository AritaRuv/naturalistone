"use client";
import {
  Avatar,
  Box,
  useMediaQuery,
  Button,
  SimpleGrid,
  HStack,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import { useState } from "react";
import UserBox from "./userBox";
import { IShowMenu } from "./page";

const UserButtonsContainer: React.FC<IShowMenu> = ({
  showMenu,
  setShowMenu,
  isSmallThan750,
}) => {
  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");

  const handleClick = (e) => {
    const { name } = e.target;
    setShowMenu(name);
  };

  const buttons = ["Profile", "Address", "Projects", "Favorites", "Log out"];
  //CUANDO SE ADAPTE EL COMPONENTE SE DEBE CREAR UN UNICO BOTON Y LUEGO MAPEAR UN ARRAY DE OBJETOS PARA CADA BOTON Y REEMPLAZAR LAS VARIABLES, CON ELLO
  //NOS EVITAMOS REPETIR CODIGO
  return (
    <>
      <VStack
        h={isSmallThan750 ? "5vh" : "50vh"}
        spacing={5}
        alignItems={"flex-start"}
        w={isSmallThan750 ? "95vw" : "10vw"}
        flexDirection={"column"}
        mt={"20px"}
        // bg={"red"}
      >
        {buttons.length
          ? buttons.map((element) => (
              <Button
                borderLeft={showMenu === element ? "3px solid black" : "unset"}
                rounded={0}
                h={"4vh"}
                // mt={isSmallThan750 ? "5vh" : 0}
                onClick={handleClick}
                pl={"1vw"}
                fontSize="0.8rem"
                variant="unstyled"
                fontWeight={"normal"}
                name={element}
              >
                {" "}
                {element}{" "}
              </Button>
            ))
          : ""}
      </VStack>
    </>
  );
};

export default UserButtonsContainer;
