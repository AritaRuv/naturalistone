"use client";
import { Box, Text } from "@chakra-ui/react";
import { IShowMenu } from "./page";
import SideCard from "./sideCard";


const ProfileInfo: React.FC<IShowMenu> = () => {
  
  return (
    <>
      <Box pl={"5vw"}  w={"70vw"}>
        <Text textTransform={"uppercase"} fontSize={"1.5rem"} fontWeight={"thin"}>PROFILE</Text>
        <Box w={"62vw"} mt={"2vh"} display={"flex"} flexDir={"row"} justifyContent={"space-between"}>       
          <Box border={"2px solid"} rounded={"sm"} borderColor={"gray.200"} w={"40vw"} h={"50vh"}>
          </Box>
          <SideCard/>
        </Box>
      </Box>


    </>
  );
};

export default ProfileInfo;
