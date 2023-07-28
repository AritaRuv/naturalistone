"use client";
import { Avatar, Box, useMediaQuery, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function UserBox({ user }) {
  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");
  const [showMenu, setShowMenu] = useState("");

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"row"}
        alignItems={"flex-start"}
        h={"70px"}
      >
        <Avatar size={"lg"} />
        <Box
          // mr={"2vh"}
          display={"flex"}
          flexDir={"column"}
          alignContent={"center"}
          justifyContent={"center"}
          ml={"10px"}
        >
          <Text fontWeight={"thin"}>Hey, Eduardooo</Text>
          <Text fontWeight={"normal"}>{user?.Contact_Name}!</Text>
        </Box>
      </Box>
    </>
  );
}
