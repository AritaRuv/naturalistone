"use client";
import { Avatar, Box, Text } from "@chakra-ui/react";

export default function UserBox() {
  

  return (
    <>
      <Box display={"flex"} flexDir={"row"} w={"175px"} justifyContent={"space-between"}>
        <Avatar size={"lg"}/>
        <Box mr={"2vh"} display={"flex"} flexDir={"column"} alignContent={"flex-end"} justifyContent={"end"} >
          <Text fontWeight={"thin"}>Hey,</Text>
          <Text fontWeight={"normal"}>Ezequiel!</Text>
        </Box>
      </Box>
    </>
  );
}
