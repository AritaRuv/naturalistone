"use client";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SlLock } from "react-icons/sl";
import { AiOutlineMail } from "react-icons/ai";
import { Props } from "./Login";
import { FormErrors } from "@/utils/validateForms";

const Register: React.FC<Props> = ({ setActiveLogin, smallerThan600 }) => {
  // const [smallerThan1100] = useMediaQuery("(max-width: 1100px)");
  // const [smallerThan600] = useMediaQuery("(max-width: 600px)");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (event) => {
    setErrors({});
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    setActiveLogin(true);
  };

  console.log("soy form data", formData);

  return (
    <Box
      display={"flex"}
      h={"68vh"}
      w={smallerThan600 ? "80vw" : "50vw"}
      bg={"#f2f2f2"}
      flexDirection={"column"}
      mt={smallerThan600 ? "70vh" : 0}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        h={"40px"}
        w={"full"}
        // bg={"yellow"}
        mt={smallerThan600 ? "8vh" : 0}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"2xl"}
      >
        <Center>SIGN UP</Center>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyItems={"center"}
        mt={"5vh"}
        // bg={"red"}
        // mt={smallerThan600 ? "50px" : "20px"}
        w={"80%"}
      >
        <FormControl>
          <SimpleGrid column={2} spacing={4}>
            <Box>
              <FormLabel>
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
                    name={"username"}
                    value={formData.username}
                    onChange={handleChange}
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
                  <FormErrorMessage>
                    {errors.username && errors.username}
                  </FormErrorMessage>
                </InputGroup>
              </FormLabel>
            </Box>
            <Box>
              <FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AiOutlineMail />
                  </InputLeftElement>
                  <Input
                    h={"30px"}
                    w={"full"}
                    position={"relative"}
                    mt={"7px"}
                    border={"none"}
                    name={"email"}
                    value={formData.email}
                    onChange={handleChange}
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
                    placeholder={"EMAIL"}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email}
                  </FormErrorMessage>
                </InputGroup>
              </FormLabel>
            </Box>
            <Box>
              <FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SlLock />
                  </InputLeftElement>
                  <Input
                    h={"30px"}
                    w={"full"}
                    position={"relative"}
                    mt={"7px"}
                    border={"none"}
                    name={"password"}
                    value={formData.password}
                    onChange={handleChange}
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
              </FormLabel>
            </Box>
            <Box>
              <FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SlLock />
                  </InputLeftElement>
                  <Input
                    h={"30px"}
                    w={"full"}
                    position={"relative"}
                    mt={"7px"}
                    border={"none"}
                    name={"password"}
                    value={formData.password}
                    onChange={handleChange}
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
                    placeholder={"CONFIRM PASSWORD"}
                  />
                </InputGroup>
              </FormLabel>
            </Box>
          </SimpleGrid>
        </FormControl>
      </Box>
      <Box
        display={"flex"}
        h={"15vh"}
        w={"full"}
        // bg={"blue"}
        mt={smallerThan600 ? "8vh" : "20px"}
        flexDirection={"column"}
      >
        <Box>
          <Center>CREATE ACCOUNT</Center>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          h={"full"}
          w={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
          bottom={-5}
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
  );
};

export default Register;
