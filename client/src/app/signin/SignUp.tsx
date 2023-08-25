"use client";
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
import { useState } from "react";
import {
  PiUserCircleThin,
  PiLockThin,
  PiEnvelopeOpenThin,
  PiEyeSlashThin,
  PiEyeThin,
} from "react-icons/pi";
import { Props } from "./Login";
import { FormErrors, validateCompletedInputs } from "@/utils/validateForms";
import { SignUp } from "@/store/login/typeLogin";
import { postSignUp } from "@/api/apiLogin";
import { useRouter } from "next/navigation";

const SignUp: React.FC<Props> = ({ setActiveLogin, smallerThan600, smallerThan1200 }) => {
  const [formData, setFormData] = useState<SignUp>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const [showErrors, setShowErrors] = useState(false);
  const [isToastShowing, setIsToastShowing] = useState(false);
  const router = useRouter();

  const handleChange = (event: any) => {
    setErrors({});
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateCompletedInputs({
        ...formData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleClick = () => {
    setActiveLogin(true);
    setErrors({});
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async () => {
    setShowErrors(true);
    const newErrors = validateCompletedInputs(formData);
    if (Object.values(newErrors).length || Object.values(errors).length) {
      if (!toast.isActive("signup")) {
        return toast({
          id: "signup",
          title: "Sign Up",
          description: "Please complete the fields.",
          status: "error",
          variant: "subtle",
          duration: 4000,
          isClosable: true,
        });
      }
      return;
    }
    const response = await postSignUp(formData);
    if (response.success === false) {
      if (!toast.isActive("signup")) {
        setIsToastShowing(true);
        return toast({
          id: "signup",
          title: "Sign Up",
          description: "Email already exists.",
          status: "warning",
          variant: "subtle",
          duration: 4000,
          isClosable: true,
          onCloseComplete: () => setIsToastShowing(false),
        });
      }
    }
    if (response.success === true) {
      if (!toast.isActive("signup")) {
        setIsToastShowing(true);
        toast({
          id: "signup",
          title: "Sign Up",
          description: "Account has been created.",
          status: "success",
          variant: "subtle",
          duration: 4000,
          isClosable: true,
          onCloseComplete: () => setIsToastShowing(false),
        });
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        router.push("/home");
        return;
      }
    }
  };

  return (
    <Box
      display={"flex"}
      h={smallerThan600 ? "60vh" : "68vh"}
      w={smallerThan600 ? "100vw" : "30vw"}
      bg={"#f2f2f2"}
      maxH={"600px"}
      minW={"450px"}
      flexDirection={"column"}
      mt={smallerThan600 ? "70vh" : 0}
      justifyContent={"center"}
      alignItems={"center"}
      mr={smallerThan600 ? 0 : "15px"}
      mb={smallerThan600 ? "15px" : 0}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h={"24vh"}
        w={"80%"}
      >
        <Text fontWeight={"thin"} fontSize={"1.4rem"}>
          SIGN UP
        </Text>
      </Box>
      <Center
        display={"flex"}
        alignItems={"center"}
        justifyItems={"center"}
        flexDirection={"column"}
        w={"18vw"}
        minW={"300px"}
        h={"35vh"}
      >
        <Box w={"full"}>
          <InputGroup h={"60px"} display={"flex"} flexDir={"column"}>
            <InputLeftElement
              top={"-10px"}
              textAlign={"center"}
              pointerEvents="none"
            >
              <IconButton
                display={"flex"}
                textAlign={"center"}
                aria-label="User-icon"
                variant="unstyled"
                fontSize="2xl"
                icon={<PiUserCircleThin />}
              />
            </InputLeftElement>
            <Input
              h={"25px"}
              w={"full"}
              position={"relative"}
              id={"fullName"}
              name={"fullName"}
              fontSize={"sm"}
              value={formData.fullName}
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
              placeholder={"FULL NAME"}
            />
            {showErrors && (
              <Text color={"red"} fontSize={"xs"} mt={"0.5vh"}>
                {errors.fullName}
              </Text>
            )}
          </InputGroup>
        </Box>
        <Box w={"full"}>
          <InputGroup h={"60px"} display={"flex"} flexDir={"column"}>
            <InputLeftElement
              top={"-10px"}
              textAlign={"center"}
              pointerEvents="none"
            >
              <IconButton
                display={"flex"}
                textAlign={"center"}
                aria-label="User-icon"
                variant="unstyled"
                fontSize="2xl"
                icon={<PiEnvelopeOpenThin />}
              />
            </InputLeftElement>
            <Input
              h={"25px"}
              w={"full"}
              position={"relative"}
              id={"email"}
              border={"none"}
              fontSize={"sm"}
              name={"email"}
              value={formData.email}
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
              <Text color={"red"} fontSize={"xs"} mt={"0.5vh"}>
                {errors.email}
              </Text>
            )}
          </InputGroup>
        </Box>
        <Box w={"full"}>
          <InputGroup h={"60px"} display={"flex"} flexDir={"column"}>
            <InputLeftElement
              top={"-10px"}
              textAlign={"center"}
              pointerEvents="none"
            >
              <IconButton
                aria-label="Password-icon"
                variant="unstyled"
                fontSize="2xl"
                display={"flex"}
                textAlign={"center"}
                icon={<PiLockThin />}
              />
            </InputLeftElement>
            <Input
              h={"25px"}
              w={"full"}
              position={"relative"}
              id={"password"}
              border={"none"}
              fontSize={"sm"}
              name={"password"}
              value={formData.password}
              onChange={handleChange}
              _focus={{
                boxShadow: "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
              }}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
                outline: "none",
              }}
              type={showPassword ? "text" : "password"}
              placeholder={"PASSWORD"}
            />
            <InputRightElement
              top={"-10px"}
              textAlign={"center"}
              aria-label="Password-icon"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <IconButton
                  aria-label="Password-icon"
                  variant="unstyled"
                  fontSize="2xl"
                  display={"flex"}
                  textAlign={"center"}
                  icon={<PiEyeSlashThin />}
                />
              ) : (
                <IconButton
                  aria-label="Password-icon"
                  variant="unstyled"
                  fontSize="2xl"
                  display={"flex"}
                  textAlign={"center"}
                  icon={<PiEyeThin />}
                />
              )}
            </InputRightElement>
            {showErrors && (
              <Text color={"red"} fontSize={"xs"} mt={"0.5vh"}>
                {errors.password}
              </Text>
            )}
          </InputGroup>
        </Box>
        <Box w={"full"}>
          <InputGroup h={"60px"} display={"flex"} flexDir={"column"}>
            <InputLeftElement
              top={"-10px"}
              textAlign={"center"}
              pointerEvents="none"
            >
              <IconButton
                aria-label="Password-icon"
                variant="unstyled"
                fontSize="2xl"
                display={"flex"}
                textAlign={"center"}
                icon={<PiLockThin />}
              />
            </InputLeftElement>
            <Input
              h={"25px"}
              w={"full"}
              position={"relative"}
              fontSize={"sm"}
              border={"none"}
              id={"confirmPassword"}
              type={showConfirmPassword ? "text" : "password"}
              name={"confirmPassword"}
              value={formData.confirmPassword}
              onChange={handleChange}
              _focus={{
                boxShadow: "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
              }}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0", // Ajusta el radio de las esquinas a cero
                outline: "none",
              }}
              placeholder={"CONFIRM PASSWORD"}
            />
            <InputRightElement
              top={"-10px"}
              textAlign={"center"}
              aria-label="Password-icon"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? (
                <IconButton
                  aria-label="Password-icon"
                  variant="unstyled"
                  fontSize="2xl"
                  display={"flex"}
                  textAlign={"center"}
                  icon={<PiEyeSlashThin />}
                />
              ) : (
                <IconButton
                  aria-label="Password-icon"
                  variant="unstyled"
                  fontSize="2xl"
                  display={"flex"}
                  textAlign={"center"}
                  icon={<PiEyeThin />}
                />
              )}
            </InputRightElement>
            {showErrors && (
              <Text color={"red"} fontSize={"xs"} mt={"0.5vh"}>
                {errors.confirmPassword}
              </Text>
            )}
          </InputGroup>
        </Box>
      </Center>
      <Box
        display={"flex"}
        h={smallerThan600 ? "20vh" : "20vh"}
        w={"full"}
        mt={smallerThan600 ? "2vh" : "0"}
        flexDirection={"column"}
      >
        <Button
          h={"10vh"}
          onClick={handleRegister}
          fontWeight={"light"}
          border={"none"}
          backgroundColor={"transparent"}
          _hover={{
            backgroundColor: "transparent",
            fontWeight: "semibold",
          }}
          _focus={{
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          CREATE ACCOUNT
        </Button>
        <Box
          display={"flex"}
          flexDirection={"row"}
          h={"full"}
          w={"full"}
          mb={"2vh"}
          justifyContent={"center"}
          alignItems={"flex-end"}
        >
          <Center color={"#6A6969"}>
            <Text fontWeight={"light"}> Already have an account?</Text>
          </Center>
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
              mb={"0.5vh"}
              onClick={handleClick}
              color={"#6A6969"}
              h={"18px"}
              w={"100px"}
              fontWeight={"light"}
            >
              LOGIN HERE
            </Button>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
