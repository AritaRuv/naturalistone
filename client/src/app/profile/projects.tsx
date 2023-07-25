'use client'
import { Avatar, Box, useMediaQuery, Text } from "@chakra-ui/react";
import { IShowMenu } from "./page";
import SideCard from "./sideCard";


const ProfileInfo: React.FC<IShowMenu> = ({setShowMenu, showMenu}) => {
  
  return (
    <>
    <Box pl={'5vw'} pt={'5vh'} w={'80vw'}>
      <Text textTransform={'uppercase'} fontSize={'1.9rem'}>PROFILE</Text>
      <Box w={'62vw'} mt={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>       
        <Box border={'2px solid'} rounded={'sm'} borderColor={'gray.200'} w={'40vw'} h={'50vh'}>
        </Box>
        <SideCard/>
      </Box>
      {/* <
     
      <Box display={'flex'} flexDir={'column'} pl={'5vw'} h={'70vh'} justifyContent={'space-evenly'} border={'2px solid red'}>
       
    </Box> */}
  </Box>


    </>
  );
}