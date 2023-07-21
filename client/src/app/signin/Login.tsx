"use client";
import {
  Box,
  Button,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { PiLockLight } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";

export interface Props {
  setActiveLogin: React.Dispatch<React.SetStateAction<boolean>>;
  smallerThan600: boolean;
}

const Login: React.FC<Props> = ({ setActiveLogin, smallerThan600 }) => {
  const handleClick = () => {
    setActiveLogin(false);
  };

  return (
    <Box
      display={"flex"}
      h={smallerThan600 ? "70vh" : "62vh"}
      w={smallerThan600 ? "80vw" : "40vw"}
      bg={"#f2f2f2"}
      // border={"2px solid red"}
      flexDirection={"column"}
      mt={smallerThan600 ? "70vh" : 0}
      mr={smallerThan600 ? 0 : "15px"}
      mb={smallerThan600 ? "15px" : 0}
    >
      <Box
        display={"flex"}
        h={"30vh"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          h={smallerThan600 ? "100px" : "180px"}
          w={smallerThan600 ? "100px" : "180px"}
          borderRadius={"50%"}
          bg={"#a9a9a9"}
          position={"relative"}
          bottom={smallerThan600 ? 12 : 9}
        ></Box>
        <Box
          display={"flex"}
          position={"relative"}
          fontSize={"2xl"}
          bottom={"10px"}
        >
          <Center> LOGIN </Center>
        </Box>
      </Box>
      <Box
        display={"flex"}
        h={"full"}
        w={"full"}
        // bg={"yellow"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          h={"20vh"}
          w={"80%"}
          // bg={"yellow"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"relative"}
          bottom={5}
          flexDirection={"column"}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IconButton 
                aria-label="User-icon"
                variant="unstyled"
                fontSize="2xl"
                icon={<PiUserCircleThin />}
              />
            </InputLeftElement>
            <Input
              h={"30px"}
              w={"full"}
              position={"relative"}
              mt={"7px"}
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
              }}
              _focus={{
                backgroundColor: "transparent",
                border: "none",
              }}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0", // Ajusta el radio de las esquinas a cero
                outline: "none",
              }}
              placeholder={"USERNAME"}
            />
          </InputGroup>
          <InputGroup display={"flex"} mt={"20px"}>
            <InputLeftElement pointerEvents="none">
              <IconButton 
                aria-label="User-icon"
                variant="unstyled"
                fontSize="2xl"
                border={"none"}
                icon={<PiLockLight />}
              />
            </InputLeftElement>
            <Input
              h={"30px"}
              w={"full"}
              position={"relative"}
              mt={"7px"}
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
              }}
              _focus={{
                backgroundColor: "transparent",
                border: "none",
              }}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0", // Ajusta el radio de las esquinas a cero
                outline: "none",
              }}
              placeholder={"PASSWORD"}
            />
          </InputGroup>
        </Box>
        <Box
          display={"flex"}
          h={"15vh"}
          w={"full"}
          // bg={"blue"}
          flexDirection={"column"}
        >
          <Box>
            <Center>LOGIN</Center>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            h={"full"}
            w={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
            bottom={0}
          >
            <Center>New customer?</Center>
            <Center ml={"10px"}>
              <Button
                border={"none"}
                backgroundColor={"transparent"}
                _hover={{
                  backgroundColor: "transparent",
                }}
                _focus={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0", // Ajusta el radio de las esquinas a cero
                  outline: "none",
                }}
                onClick={handleClick}
              >
                START HERE
              </Button>
            </Center>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
