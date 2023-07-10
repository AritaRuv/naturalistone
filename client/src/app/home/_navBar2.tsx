"use client";

import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from 'react';
import Logo from "./_navBar/logo";
import TextButtonsNavBar from "./_navBar/textButtonsNavBar";
import IconButtonsNavBar from "./_navBar/iconButtonsNavBar";
import Menu from "./_navBar/menu";6
import DropDownMenu from "./_navBar/dropDownMenu";
import MenuDrawer from "./_navBar/menuDrawer";
import CartButton from "./_navBar/cartButton";

const NavBar2: React.FC = () => {

  const [menuVisible, setMenuVisible] = useState(true)
  const [hover, setHover] = useState(false)

  const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const handleMenu =() => {
    setMenuVisible(!menuVisible)
  }

  const handleHome =() => {
    setMenuVisible(true)
    setHover(false)
  }

  const handleMouseEnter = () => {
    setHover(true);

  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return(
    <>
    {
      !smallerThan1200 ? (
      <Box display={'flex'} flexDir={'column'}>
        <Box 
          w={'100%'} 
          h={'6vh'} 
          minH={'60px'} 
          maxH={'80px'} 
          display={'flex'} 
          flexDir={'row'} 
          justifyContent={'space-between'} 
          px={'4%'}
          >
          <Logo />
        {
          !smallerThan740 &&( 
            <TextButtonsNavBar menuVisible={menuVisible}/>
        )
        }
          <Box display={'flex'} flexDir={'row'} w={'16%'} justifyContent={'space-between'} alignItems="center">
            <IconButtonsNavBar/>
            <Menu handleMenu={handleMenu}/>
          </Box>

        </Box>
        {
          !menuVisible && (
          <DropDownMenu handleHome={handleHome}/>
         )
        }
      </Box>
      )
      :
      !smallerThan740 ? 
      (
      <Box 
        display={'flex'} 
        flexDir={'row'}
        w={'100%'} 
        h={'6vh'} 
        minH={'60px'} 
        maxH={'80px'}
        alignItems={'center'}  
        justifyContent={'space-between'} 
        px={'4%'}
        >
        <MenuDrawer handleHome={handleHome} smallerThan740={smallerThan740}/>
        <Logo/>
        <IconButtonsNavBar/>
      </Box>
      )
      :
      (
      <Box 
        display={'flex'} 
        flexDir={'row'}
        w={'100%'} 
        h={'6vh'} 
        minH={'60px'} 
        maxH={'80px'}
        alignItems={'center'}  
        justifyContent={'space-between'} 
        px={'4%'}
        >
        <MenuDrawer handleHome={handleHome} smallerThan740={smallerThan740}/>
        <Logo/>
        <CartButton/>
      </Box>   
      )
    }

    </>
  )
}

export default NavBar2;