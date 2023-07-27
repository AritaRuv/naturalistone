'use client'
import { Avatar, Box, useMediaQuery, Button, SimpleGrid, HStack, VStack } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import { useState } from "react";
import UserBox from "./userBox";
import { IShowMenu } from "./page";


const UserButtonsContainer:React.FC<IShowMenu> = ({showMenu, setShowMenu}) => {
  
  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");

  const handleClick = (e) => {
    const {name} = e.target
    setShowMenu(name)
    }
  //CUANDO SE ADAPTE EL COMPONENTE SE DEBE CREAR UN UNICO BOTON Y LUEGO MAPEAR UN ARRAY DE OBJETOS PARA CADA BOTON Y REEMPLAZAR LAS VARIABLES, CON ELLO 
  //NOS EVITAMOS REPETIR CODIGO
  return (
    <>
      <VStack h={'45vh'} spacing={5} alignItems={'flex-start'} w={'10vw'} >
      <Button borderLeft={showMenu === 'Profile' ? '3px solid black' : 'unset'} rounded={0} h={'4vh'} onClick={handleClick} pl={'1vw'} fontSize="0.8rem" variant="unstyled" fontWeight={'normal'} name="Profile"> Profile </Button>
        <Button borderLeft={showMenu === 'Address' ? '3px solid black' : 'unset'} rounded={0} h={'4vh'} onClick={handleClick} pl={'1vw'} fontSize="0.8rem" variant="unstyled" fontWeight={'normal'} name="Address"> Address </Button>
        <Button borderLeft={showMenu === 'Projects' ? '3px solid black' : 'unset'} rounded={0} h={'4vh'} onClick={handleClick} pl={'1vw'} fontSize="0.8rem" variant="unstyled" fontWeight={'normal'} name="Projects"> Projects </Button>
        <Button borderLeft={showMenu === 'Favorites' ? '3px solid black' : 'unset'} rounded={0} h={'4vh'} onClick={handleClick} pl={'1vw'} fontSize="0.8rem" variant="unstyled" fontWeight={'normal'} name="Favorites"> Favorites </Button>
        <Button borderLeft={showMenu === 'Log Out' ? '3px solid black' : 'unset'} rounded={0} h={'4vh'} onClick={handleClick} pl={'1vw'} fontSize="0.8rem" variant="unstyled" fontWeight={'normal'} name="Log Out"> Log Out </Button>
      </VStack>
    </>
  );
}

export default UserButtonsContainer
