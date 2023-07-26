"use client";
import { Avatar, Box, useMediaQuery, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function UserBox() {
  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");
  const [showMenu, setShowMenu] = useState("");

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"row"}
        justifyContent={"space-between"}
        // bg={"green"}
        w={"full"}
        h={"7vh"}
      >
        <Avatar size={"lg"} />
        <Box
          mr={"2vh"}
          display={"flex"}
          flexDir={"column"}
          alignContent={"flex-end"}
          justifyContent={"end"}
        >
          <Text fontWeight={"thin"}>Hey,</Text>
          <Text fontWeight={"normal"}>Ezequiel!</Text>
        </Box>
      </Box>
    </>
  );
}

