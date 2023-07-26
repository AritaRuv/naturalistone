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
  //CUANDO SE ADAPTE EL COMPONENTE SE DEBE CREAR UN UNICO BOTON Y LUEGO MAPEAR UN ARRAY DE OBJETOS PARA CADA BOTON Y REEMPLAZAR LAS VARIABLES, CON ELLO
  //NOS EVITAMOS REPETIR CODIGO
  return (
    <>
      <VStack
        h={isSmallThan750 ? "5vh" : "45vh"}
        spacing={5}
        alignItems={"flex-start"}
        w={isSmallThan750 ? "95vw" : "10vw"}
        flexDirection={isSmallThan750 ? "row" : "column"}
        mt={isSmallThan750 ? "20px" : 0}
        // bg={"red"}
      >
        <Button
          borderLeft={showMenu === "Profile" ? "3px solid black" : "unset"}
          rounded={0}
          h={"4vh"}
          // mt={isSmallThan750 ? "5vh" : 0}
          onClick={handleClick}
          pl={"1vw"}
          fontSize="0.8rem"
          variant="unstyled"
          fontWeight={"normal"}
          name="Profile"
        >
          {" "}
          Profile{" "}
        </Button>
        <Button
          borderLeft={showMenu === "Address" ? "3px solid black" : "unset"}
          rounded={0}
          h={"4vh"}
          onClick={handleClick}
          pl={"1vw"}
          fontSize="0.8rem"
          variant="unstyled"
          fontWeight={"normal"}
          name="Address"
        >
          {" "}
          Address{" "}
        </Button>
        <Button
          borderLeft={showMenu === "Projects" ? "3px solid black" : "unset"}
          rounded={0}
          h={"4vh"}
          onClick={handleClick}
          pl={"1vw"}
          fontSize="0.8rem"
          variant="unstyled"
          fontWeight={"normal"}
          name="Projects"
        >
          {" "}
          Projects{" "}
        </Button>
        <Button
          borderLeft={showMenu === "Favorites" ? "3px solid black" : "unset"}
          rounded={0}
          h={"4vh"}
          onClick={handleClick}
          pl={"1vw"}
          fontSize="0.8rem"
          variant="unstyled"
          fontWeight={"normal"}
          name="Favorites"
        >
          {" "}
          Favorites{" "}
        </Button>
        <Button
          borderLeft={showMenu === "Log Out" ? "3px solid black" : "unset"}
          rounded={0}
          h={"4vh"}
          onClick={handleClick}
          pl={"1vw"}
          fontSize="0.8rem"
          variant="unstyled"
          fontWeight={"normal"}
          name="Log Out"
        >
          {" "}
          Log Out{" "}
        </Button>
      </VStack>
    </>
  );
};

export default UserButtonsContainer;

