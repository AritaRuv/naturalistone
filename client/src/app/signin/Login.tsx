"use client";
import { useAppDispatch } from "@/store/hooks";
import { SignIn } from "@/store/login/typeLogin";
import {
  FormErrorsLogin,
  validateCompletedInputsLogin,
} from "@/utils/validateForms";
import {
  Box,
  Button,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PiLockLight } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";
import { BsEyeSlash } from "react-icons/bs";
import { postSignin } from "@/api/apiLogin";
import { useRouter } from "next/navigation";

export interface Props {
  setActiveLogin: React.Dispatch<React.SetStateAction<boolean>>;
  smallerThan600: boolean;
}

const Login: React.FC<Props> = ({ setActiveLogin, smallerThan600 }) => {
  const [formData, setFormData] = useState<SignIn>({
    email: "",
    password: "",
  });


  const [errors, setErrors] = useState<FormErrorsLogin>({});
  const [show, setShow] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const [isToastShowing, setIsToastShowing] = useState(false);

  const handleChange = (event) => {
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
    if (!isToastShowing) {
      if (data.success === false) {
        setIsToastShowing(true);
        if (setIsToastShowing) {
          return toast({
            title: "Log in",
            description: "Incorrect username or password.",
            status: "warning",
            variant: "subtle",
            duration: 4000,
            isClosable: true,
            onCloseComplete: () => setIsToastShowing(false),
          });
        }
      }
    }
    if (!isToastShowing) {
      if (data.success) {
        setIsToastShowing(true);
        if (setIsToastShowing) {
          toast({
            title: "Log in",
            description: "Log in successfull.",
            status: "success",
            variant: "subtle",
            duration: 4000,
            isClosable: true,
            onCloseComplete: () => setIsToastShowing(false),
          });
        }
        router.push("/home");
        setFormData({
          email: "",
          password: "",
        });
        return;
      }
    }
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
        w={"full"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          mt={"-30px"}
          h={smallerThan600 ? "120px" : "160px"}
          minH={smallerThan600 ? "120px" : "160px"}
          w={smallerThan600 ? "120px" : "160px"}
          minW={smallerThan600 ? "120px" : "160px"}
          borderRadius={"50%"}
          bg={"#a9a9a9"}
        ></Box>
        <Box display={"flex"} fontSize={"2xl"} mt={"3vh"}>
          <Center fontWeight={"thin"}> LOG IN </Center>
        </Box>
      </Box>
      <Box
        display={"flex"}
        h={"25vh"}
        w={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          h={"20vh"}
          w={"70%"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"relative"}
          top={smallerThan600 ? -1 : 2}
          flexDirection={"column"}
        >
          <Box display={"flex"} w={"full"}>
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
            </InputGroup>
          </Box>
          <Box display={"flex"} w={"full"}>
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
                fontSize="xl"
                onClick={handleShow}
              >
                <BsEyeSlash />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      </Box>

      <Box
        display={"flex"}
        h={"15vh"}
        w={"full"}
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
              LOG IN
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
