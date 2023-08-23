"use client";

import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Logo from "./logo";
import TextButtonsNavBar from "./textButtonsNavBar";
import IconButtonsNavBar from "./iconButtonsNavBar";
import Menu from "./menu";
import DropDownMenu from "./dropDownMenu";
import MenuDrawer from "./menuDrawer";
import CartButton from "./cartButton";
import { useAppDispatch } from "@/store/hooks";
import { userInfo } from "@/store/login/actionsLogin";

const NavBar: React.FC = () => {

  const [menuVisible, setMenuVisible] = useState(true);
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");
  const dispatch = useAppDispatch();

  const handleMenu =() => {
    setMenuVisible(!menuVisible);
    setActive(true);
  };

  const handleHome =() => {
    setMenuVisible(true);
    setHover(false);
    setActive(false);
  };

  const handleMouseEnter = () => {
    setHover(true);

  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  useEffect(() => {
    dispatch(userInfo());
  }, []);

  return(
    <>
      {
        !smallerThan1200 ? (
          <Box display={"flex"} flexDir={"column"} position={"relative"}>
            <Box 
              bg={active ? "white" : hover ? "white" : "none"}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              id={"navbar"}
              w={"100%"} 
              h={"6vh"} 
              minH={"60px"} 
              maxH={"80px"} 
              display={"flex"} 
              flexDir={"row"}
              zIndex={1}
              justifyContent={"space-between"} 
              px={"4%"}
            >
              <Logo />
              {
                !smallerThan740 &&( 
                  <TextButtonsNavBar menuVisible={menuVisible}/>
                )
              }
              <Box display={"flex"} flexDir={"row"} w={"16%"} justifyContent={"space-between"} alignItems="center">
                <IconButtonsNavBar/>
                <Menu handleMenu={handleMenu}/>
              </Box>

            </Box>
            {
              !menuVisible && (
                <DropDownMenu handleHome={handleHome} active={active}/>
              )
            }
          </Box>
        )
          :
          !smallerThan740 ? 
            (
              <Box 
                id={"navbar"}
                display={"flex"} 
                flexDir={"row"}
                w={"100%"} 
                h={"6vh"} 
                minH={"60px"} 
                maxH={"80px"}
                zIndex={1}
                alignItems={"center"}  
                justifyContent={"space-between"} 
                px={"4%"}
              >
                <MenuDrawer handleHome={handleHome} smallerThan740={smallerThan740}/>
                <Logo/>
                <IconButtonsNavBar/>
              </Box>
            ):(
              <Box
                id={"navbar"}
                display={"flex"} 
                flexDir={"row"}
                w={"100%"} 
                h={"6vh"} 
                zIndex={1}
                minH={"60px"} 
                maxH={"80px"}
                alignItems={"center"}  
                justifyContent={"space-between"} 
                px={"4%"}
              >
                <MenuDrawer handleHome={handleHome} smallerThan740={smallerThan740}/>
                <Logo/>
                <CartButton/>
              </Box>   
            )
      }

    </>
  );
};

export default NavBar;