"use client";
import { Box} from "@chakra-ui/react";
import UserBox from "./userBox";
import UserButtonsContainer from "./userButtonsContainer";
import { IShowMenu } from "./page";

const UserMenu: React.FC<IShowMenu> = ({
  isSmallThan750,
  user,
}) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        w={"220px"}
        justifyContent={"flex-start"}
        hidden={isSmallThan750 ? true : false}
      >
        <UserBox user={user} />
        <UserButtonsContainer
          isSmallThan750={isSmallThan750}
        />
      </Box>
    </>
  );
};

export default UserMenu;

