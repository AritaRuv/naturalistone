"use client";
import { useAppDispatch } from "@/store/hooks";
import { Signin } from "@/store/login/typeLogin";
import {
  FormErrors,
  FormErrorsLogin,
  validateCompletedInputs,
  validateCompletedInputsLogin,
} from "@/utils/validateForms";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { PiLockLight } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";
import { BsEyeSlash } from "react-icons/bs";
import { postRegister, postSignin } from "@/api/apiLogin";
import { useRouter } from "next/navigation";

export interface Props {
  setActiveLogin: React.Dispatch<React.SetStateAction<boolean>>;
  smallerThan600: boolean;
}

const Login: React.FC<Props> = ({ setActiveLogin, smallerThan600 }) => {
  const [formData, setFormData] = useState<Signin>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<FormErrorsLogin>({});
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [show, setShow] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleChange = (event) => {
    // setErrors({});
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateCompletedInputsLogin({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleClick = () => {
    setActiveLogin(false);
  };

  const handleLogin = async () => {
    setShowErrors(true);
    if (Object.keys(errors).length) return;
    const data: any = await postSignin(formData);
    if (data.success === false) {
      return toast({
        title: "Login",
        description: "Incorrect username or password.",
        status: "warning",
        variant: "subtle",
        duration: 4000,
        isClosable: true,
      });
    }
    router.push("/home");
    setFormData({
      email: "",
      password: "",
    });
    return;
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Box
      display={"flex"}
      h={smallerThan600 ? "60vh" : "68vh"}
      maxH={"600px"}
      w={smallerThan600 ? "100vw" : "35vw"}
      minW={"400px"}
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
        // bg={"red"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          h={smallerThan600 ? "120px" : "160px"}
          w={smallerThan600 ? "120px" : "160px"}
          borderRadius={"50%"}
          bg={"#a9a9a9"}
          position={"relative"}
          bottom={smallerThan600 ? 12 : 8}
        ></Box>
        <Box
          display={"flex"}
          position={"relative"}
          fontSize={"2xl"}
          bottom={"30px"}
        >
          <Center> LOGIN </Center>
        </Box>
      </Box>
      <Box
        display={"flex"}
        h={"25vh"}
        w={"full"}
        // bg={"yellow"}
        // position={"relative"}
        // top={"2vh"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          h={"20vh"}
          w={"70%"}
          // bg={"yellow"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"relative"}
          top={smallerThan600 ? -1 : 2}
          // bottom={5}
          flexDirection={"column"}
        >
          {/* <FormControl isInvalid={isFormInvalid}> */}
          <Box display={"flex"} w={"full"}>
            {/* <FormLabel> */}
            <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
              <InputLeftElement pointerEvents="none">
                <IconButton
                  aria-label="User-icon"
                  variant="unstyled"
                  fontSize="xl"
                  icon={<PiUserCircleThin />}
                />
              </InputLeftElement>
              <Input
                h={"25px"}
                w={"full"}
                position={"relative"}
                fontSize={"sm"}
                mt={"7px"}
                id={"email"}
                name={"email"}
                value={formData.email}
                border={"none"}
                onChange={handleChange}
                _focus={{
                  boxShadow: "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                }}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0", // Ajusta el radio de las esquinas a cero
                  outline: "none",
                }}
                placeholder={"E-MAIL"}
              />
              {showErrors && (
                <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                  {errors.email}
                </Text>
              )}
              {/* <FormErrorMessage>
                    {errors.email && errors.email}
                  </FormErrorMessage> */}
            </InputGroup>
            {/* </FormLabel> */}
          </Box>
          <Box display={"flex"} w={"full"}>
            {/* <FormLabel> */}
            <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
              <InputLeftElement pointerEvents="none">
                <IconButton
                  aria-label="User-icon"
                  variant="unstyled"
                  fontSize="xl"
                  border={"none"}
                  icon={<PiLockLight />}
                />
              </InputLeftElement>
              <Input
                h={"25px"}
                w={"full"}
                position={"relative"}
                mt={"7px"}
                fontSize={"sm"}
                type={show ? "text" : "password"}
                name={"password"}
                value={formData.password}
                border={"none"}
                onChange={handleChange}
                _focus={{
                  boxShadow: "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                }}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0", // Ajusta el radio de las esquinas a cero
                  outline: "none",
                }}
                placeholder={"PASSWORD"}
              />
              {showErrors && (
                <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                  {errors.password}
                </Text>
              )}
              <InputRightElement
                aria-label="Password-icon"
                // variant="unstyled"
                fontSize="xl"
                onClick={handleShow}
              >
                <BsEyeSlash />
              </InputRightElement>
              {/* <FormErrorMessage>
                {errors.password && errors.password}
              </FormErrorMessage> */}
            </InputGroup>
            {/* </FormLabel> */}
          </Box>
          {/* </FormControl> */}
        </Box>
      </Box>

      <Box
        display={"flex"}
        h={"15vh"}
        w={"full"}
        // bg={"blue"}
        mb={"2vh"}
        flexDirection={"column"}
      >
        <Box>
          <Center>
            <Button
              onClick={handleLogin}
              fontWeight={"sm"}
              border={"none"}
              backgroundColor={"transparent"}
              _hover={{
                backgroundColor: "transparent",
              }}
              _focus={{
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              LOGIN
            </Button>
          </Center>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          h={"full"}
          w={"full"}
          justifyContent={"center"}
          alignItems={"flex-end"}
          color={"#6A6969"}
          fontWeight={300}
          // position={"relative"}
          // bottom={0}
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
                borderBottom: "1px solid gray",
                borderRadius: "0", // Ajusta el radio de las esquinas a cero
                outline: "none",
              }}
              color={"#6A6969"}
              h={"18px"}
              mb={"0.5vh"}
              fontWeight={300}
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

export default Login;
