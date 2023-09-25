"use client";
import { Box } from "@chakra-ui/react";
import UserButtonsContainer from "./userButtonsContainer";
import { IShowMenu } from "@/interfaces/profile";

const UserMenu: React.FC<IShowMenu> = ({ isSmallThan750 }) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        w={"220px"}
        justifyContent={"flex-start"}
        hidden={isSmallThan750 ? true : false}
      >
        <UserButtonsContainer/>
      </Box>
    </>
  );
};

export default UserMenu;
