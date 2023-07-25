'use client'
import { Avatar, Box, useMediaQuery, Text } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import { useState } from "react";
import UserBox from "./userBox";
import UserButtonsContainer from "./userButtonsContainer";
import { IShowMenu } from "./page";


const UserMenu: React.FC<IShowMenu> = ({setShowMenu, showMenu}) => {
  

  return (
    <>
      <Box display={'flex'} flexDir={'column'} w={'20vw'} maxW={'175px'} h={'60vh'} justifyContent={'space-between'}>
        <UserBox/>
        <UserButtonsContainer setShowMenu={setShowMenu} showMenu={showMenu}/>
      </Box>
    </>
  );
}

export default UserMenu
