"use client";
import {  Box, Button, Text, VStack } from "@chakra-ui/react";

const ProjecteInfo = () => {
  
  return (
    <>
      <Box pl={"4.5vw"} pt={"4vh"}  w={"25vw"} h={"91vh"} >
        <Button h={"3vh"} display={"flex"} variant={"unstyled"} fontWeight={"light"} fontSize={"0.7rem"} textAlign={"end"}>← BACK</Button>
        <Text fontSize={"1.2rem"} fontWeight={"normal"}>NOMBRE DEL PROYECTO</Text>
        <VStack pl={"2vw"} pt={"2vh"} alignItems={"flex-start"} mt={"2vh"}>
          <Box>
            <Text borderLeft={"2px solid black"} pl={"1vh"} fontSize={"0.9rem"} fontWeight={"semibold"}>PROYECT INFORMATION</Text>
          </Box>
          <VStack pl={"1vw"} alignItems={"flex-start"}>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>COMPANY</Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>Nombre de la Empresa</Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>EMAIL</Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>maildelaempresa@hotmail.com</Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>PHONE</Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>123 2344 5443</Text>
            </Box>
          </VStack>
          
        </VStack>
        <VStack pl={"2vw"} pt={"2vh"} alignItems={"flex-start"}>
          <Box>
            <Text borderLeft={"2px solid black"} pl={"1vh"} fontSize={"0.9rem"} fontWeight={"semibold"}>SHIPPING ADDRESS</Text>
          </Box>
          <VStack pl={"1vw"} alignItems={"flex-start"}>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>ADDRESS</Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>Siempre Viva 742</Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>ZIP CODE</Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>89011</Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>CITY</Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>Henderson</Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>STATE</Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>Nevada</Text>
            </Box>
          </VStack>
          
        </VStack>
      </Box>
    </>
  );
};

export default ProjecteInfo;
