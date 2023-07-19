"use client";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { PiLockLight } from "react-icons/pi";

interface Props {
  setActiveLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setActiveLogin }: Props) => {
  const [smallerThan1100] = useMediaQuery("(max-width: 1100px)");
  const [smallerThan600] = useMediaQuery("(max-width: 600px)");
  const [boxCircle, setBoxCircle] = useState({ h: "200px", w: "200px" });

  // useEffect(() => {
  //   if (!smallerThan1100) {
  //     setBoxCircle({
  //       ...boxCircle,
  //       h: "200px",
  //       w: "200px",
  //     });
  //   }
  //   if (smallerThan600) {
  //     setBoxCircle({
  //       ...boxCircle,
  //       h: "100px",
  //       w: "100px",
  //     });
  //   }
  // }, [smallerThan1100, smallerThan600]);

  const handleClick = () => {
    setActiveLogin(false);
  };

  return (
    <Box
      display={"flex"}
      h={"68vh"}
      w={"50vw"}
      bg={"#f2f2f2"}
      border={"2px solid red"}
      position={"relative"}
      flexDirection={"column"}
      bottom={10}
    >
      <Box
        display={"flex"}
        h={"30vh"}
        w={"full"}
        // borderRadius={"50%"}
        // bg={"red"}
        // position={"relative"}
        alignItems={"center"}
        justifyContent={"center"}
        top={0}
        flexDirection={"column"}
        // bg={"green"}
      >
        <Box
          display={"flex"}
          h={boxCircle.h}
          w={boxCircle.w}
          borderRadius={"50%"}
          bg={"#a9a9a9"}
          position={"relative"}
          bottom={8}
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
              <FaRegUserCircle />
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
                borderBottom: "2px solid black",
                borderRadius: "0", // Ajusta el radio de las esquinas a cero
                outline: "none",
              }}
              placeholder={"USERNAME"}
            />
          </InputGroup>
          <InputGroup display={"flex"} mt={"20px"}>
            <InputLeftElement pointerEvents="none">
              <PiLockLight />
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
                borderBottom: "2px solid black",
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
