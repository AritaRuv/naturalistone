"use client";
import { Box } from "@chakra-ui/react";
import UserBox from "./userBox";
import UserButtonsContainer from "./userButtonsContainer";
import { IShowMenu } from "./page";


const UserMenu: React.FC<IShowMenu> = () => {
  

  return (
    <>
      <Box display={"flex"} flexDir={"column"} w={"12vw"} minW={"170px"} h={"60vh"} justifyContent={"space-between"}>
        <UserBox/>
        <UserButtonsContainer/>
      </Box>
    </>
  );
};

export default UserMenu;
