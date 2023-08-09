"use client";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { IShowMenu } from "./page";

const UserBox: React.FC<IShowMenu> = ({ user }) => {

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
        h={"100px"}
        minW={"250px"}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          alignContent={"center"}
          justifyContent={"center"}
          ml={"15px"}
        >
          <Text fontWeight={"thin"} fontSize={"0.9rem"}>Hey,</Text>
          <Text fontWeight={"normal"} fontSize={"1.2rem"}>{user?.Contact_Name.split(" ")[0]}!</Text>
        </Box>
      </Box>
    </>
  );
};

export default UserBox;
