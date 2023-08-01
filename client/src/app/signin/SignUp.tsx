"use client";
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
  SimpleGrid,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { PiLockLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { Props } from "./Login";
import { FormErrors, validateCompletedInputs } from "@/utils/validateForms";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { SignUp } from "@/store/login/typeLogin";
// import { registerUser } from "@/store/login/actionsLogin";
import { BsEyeSlash } from "react-icons/bs";
import { postSignUp } from "@/api/apiLogin";
import { HiOutlineMail } from "react-icons/hi";

const SignUp: React.FC<Props> = ({ setActiveLogin, smallerThan600 }) => {
  const [formData, setFormData] = useState<SignUp>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const [showErrors, setShowErrors] = useState(false);

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
    if (Object.keys(errors).length) {
      return;
    }
    const response = await postSignUp(formData);
    if (response.success === false) {
      toast({
        title: "Sign Up",
        description: "Email already exists.",
        status: "warning",
        variant: "subtle",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Sign Up",
      description: "Account has been created.",
      status: "success",
      variant: "subtle",
      duration: 4000,
      isClosable: true,
    });
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    return;
  };

  return (
    <Box
      display={"flex"}
      h={smallerThan600 ? "60vh" : "68vh"}
      w={smallerThan600 ? "100vw" : "35vw"}
      bg={"#f2f2f2"}
      maxH={"600px"}
      minW={"350px"}
      flexDirection={"column"}
      mt={smallerThan600 ? "70vh" : 0}
      justifyContent={"center"}
      alignItems={"center"}
      mr={smallerThan600 ? 0 : "15px"}
      mb={smallerThan600 ? "15px" : 0}
    >
      <Box
        display={"flex"}
        // bg={"yellow"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        h={"15vh"}
        w={"80%"}
      >
        <Box
          display={"flex"}
          h={"40px"}
          w={"full"}
          // bg={"yellow"}
          mt={smallerThan600 ? "4vh" : "4vh"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          fontSize={"xl"}
          mb={"2vh"}
        >
          <Center>SIGN UP</Center>
        </Box>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyItems={"center"}
        flexDirection={"column"}
        // mt={"5vh"}
        // bg={"red"}
        // mt={smallerThan600 ? "50px" : "20px"}
        w={"80%"}
      >
        {/* <FormControl onSubmit={handleRegister} isInvalid={isFormInvalid}> */}
        {/* <SimpleGrid column={2}> */}
        <Box display={"flex"} w={"full"}>
          {/* <FormLabel htmlFor="fullName"> */}
          <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
            <InputLeftElement pointerEvents="none">
              <IconButton
                aria-label="User-icon"
                variant="unstyled"
                fontSize="xl"
                mb={"12px"}
                icon={<PiUserCircleThin />}
              />
            </InputLeftElement>
            <Input
              h={"25px"}
              w={"full"}
              position={"relative"}
              // mt={"7px"}
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
            {/* <FormErrorMessage>
                {errors.fullName && errors.fullName}
              </FormErrorMessage> */}
          </InputGroup>
          {/* </FormLabel> */}
        </Box>
        <Box display={"flex"} w={"full"}>
          {/* <FormLabel> */}
          <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
            <InputLeftElement pointerEvents="none">
              <IconButton
                aria-label="Email-icon"
                variant="unstyled"
                fontSize="xl"
                // size={"50px"}
                // color="gray.300"
                icon={<HiOutlineMail style={{ strokeWidth: 1 }}/>}
              />
            </InputLeftElement>
            <Input
              h={"25px"}
              w={"full"}
              position={"relative"}
              id={"email"}
              mt={"7px"}
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
                aria-label="Password-icon"
                variant="unstyled"
                fontSize="xl"
                icon={<PiLockLight />}
              />
            </InputLeftElement>
            <Input
              h={"25px"}
              w={"full"}
              position={"relative"}
              mt={"7px"}
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
              aria-label="Password-icon"
              // variant="unstyled"
              fontSize="xl"
              onClick={handleShowPassword}
            >
              <BsEyeSlash />
            </InputRightElement>
            {showErrors && (
              <Text color={"red"} fontSize={"xs"} mt={"0.5vh"}>
                {errors.password}
              </Text>
            )}

            {/* <FormErrorMessage>
                    {errors.password && errors.password}
                  </FormErrorMessage> */}
          </InputGroup>
          {/* </FormLabel> */}
        </Box>
        <Box display={"flex"} w={"full"}>
          {/* <FormLabel> */}
          <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
            <InputLeftElement pointerEvents="none">
              <IconButton
                aria-label="Password-icon"
                variant="unstyled"
                fontSize="xl"
                icon={<PiLockLight />}
              />
            </InputLeftElement>
            <Input
              h={"25px"}
              w={"full"}
              position={"relative"}
              mt={"7px"}
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
              aria-label="Password-icon"
              // variant="unstyled"
              onClick={handleShowConfirmPassword}
              fontSize="xl"
            >
              <BsEyeSlash />
            </InputRightElement>
            {showErrors && (
              <Text color={"red"} fontSize={"xs"} mt={"0.5vh"}>
                {errors.confirmPassword}
              </Text>
            )}
          </InputGroup>
          {/* </FormLabel> */}
        </Box>
        {/* </SimpleGrid> */}
        {/* </FormControl> */}
      </Box>
      <Box
        display={"flex"}
        h={smallerThan600 ? "20vh" : "20vh"}
        w={"full"}
        // bg={"blue"}
        mt={smallerThan600 ? "2vh" : "0"}
        flexDirection={"column"}
      >
        <Box>
          <Center>
            <Button
              onClick={handleRegister}
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
              CREATE ACCOUNT
            </Button>
          </Center>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          h={"full"}
          w={"full"}
          mb={"2vh"}
          // bg={"red"}
          // mt={smallerThan1400 ? 0 : "2vh"}
          justifyContent={"center"}
          alignItems={"flex-end"}
          // position={"relative"}
          // top={smallerThan1400 ? 0 : 5}
        >
          <Center color={"#6A6969"} fontWeight={"300"}>
            Already have an account?
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
              fontWeight={300}
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
