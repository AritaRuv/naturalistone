"use client";
import { Avatar, Box, Text } from "@chakra-ui/react";

export default function UserBox() {

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
          <Text fontWeight={"thin"}>Hey, </Text>
          <Text fontWeight={"normal"}>Eduardo!</Text>
        </Box>
      </Box>
    </>
  );
}
