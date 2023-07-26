"use client";
import { Avatar, Box, useMediaQuery, Text } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import { useState } from "react";
import UserBox from "./userBox";
import UserButtonsContainer from "./userButtonsContainer";
import { IShowMenu } from "./page";

const UserMenu: React.FC<IShowMenu> = ({
  setShowMenu,
  showMenu,
  isSmallThan750,
}) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        w={"12vw"}
        h={isSmallThan750 ? "10vh" : "60vh"}
        // bg={"blue"}
        justifyContent={"space-between"}
      >
        <UserBox />
        <UserButtonsContainer
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          isSmallThan750={isSmallThan750}
        />
      </Box>
    </>
  );
};

export default UserMenu;

