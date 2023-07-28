"use client";
import { Box} from "@chakra-ui/react";
import UserBox from "./userBox";
import UserButtonsContainer from "./userButtonsContainer";
import { IShowMenu } from "./page";

const UserMenu: React.FC<IShowMenu> = ({isSmallThan750 }) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        w={"220px"}
        h={"60vh"}
        justifyContent={"flex-start"}
        hidden={isSmallThan750 ? true : false}
        // alignItems={"flex-end"}
      >
        <UserBox/>
        <UserButtonsContainer/>
      </Box>
    </>
  );
};

export default UserMenu;

