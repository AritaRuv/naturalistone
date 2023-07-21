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
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { PiLockLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { Props } from "./Login";
import { FormErrors, validateCompletedInputs } from "@/utils/validateForms";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { Register } from "@/store/login/typeLogin";
import { registerUser } from "@/store/login/actionsLogin";

const Register: React.FC<Props> = ({ setActiveLogin, smallerThan600 }) => {
  const [smallerThan1400] = useMediaQuery("(max-width: 1400px)");
  // const [smallerThan600] = useMediaQuery("(max-width: 600px)");
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Register>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleChange = (event) => {
    // setErrors({});
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    const errors = validateCompletedInputs({
      ...formData,
      [name]: value,
    });
    // Comprobar si hay errores en el campo "username"
    const isUsernameInvalid = !!errors.username;
    // Comprobar si hay errores en el campo "email"
    const isEmailInvalid = !!errors.email;
    // Comprobar si hay errores en el campo "password"
    const isPasswordInvalid = !!errors.password;
    // Comprobar si hay errores en el campo "confirmPassword"
    const isConfirmPasswordInvalid = !!errors.confirmPassword;

    // Combinar todos los resultados para obtener isFormInvalid (true si hay errores en al menos un campo, false si no hay errores en ningún campo)
    const formHasErrors =
      isUsernameInvalid ||
      isEmailInvalid ||
      isPasswordInvalid ||
      isConfirmPasswordInvalid;

    // Establecer los errores y la propiedad isInvalid en el estado
    setErrors(errors);
    setIsFormInvalid(formHasErrors);
  };

  const handleClick = () => {
    setActiveLogin(true);
  };

  const handleRegister = () => {
    // dispatch(registerUser(formData));
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Box
      display={"flex"}
      h={smallerThan600 ? "70vh" : "62vh"}
      w={smallerThan600 ? "80vw" : "40vw"}
      bg={"#f2f2f2"}
      flexDirection={"column"}
      mt={smallerThan600 ? "70vh" : 0}
      justifyContent={"center"}
      alignItems={"center"}
      mr={smallerThan600 ? 0 : "15px"}
      mb={smallerThan600 ? "15px" : 0}
    >
      <Box
        display={"flex"}
        h={"40px"}
        w={"full"}
        // bg={"yellow"}
        mt={smallerThan600 ? "10vh" : 0}
        justifyContent={"center"}
        alignItems={"flex-start"}
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
        <FormControl onSubmit={handleRegister} isInvalid={isFormInvalid}>
          <SimpleGrid column={2}>
            <Box>
              <FormLabel htmlFor="username">
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"60px"}
                >
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
                    // mt={"7px"}
                    border={"none"}
                    id={"username"}
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
                      borderBottom: "1px solid black",
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
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"60px"}
                >
                  <InputLeftElement pointerEvents="none">
                    <IconButton
                      aria-label="Email-icon"
                      variant="unstyled"
                      fontSize="xl"
                      // size={"50px"}
                      // color="gray.300"
                      icon={<TfiEmail />}
                    />
                  </InputLeftElement>
                  <Input
                    h={"30px"}
                    w={"full"}
                    position={"relative"}
                    id={"email"}
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
                      borderBottom: "1px solid black",
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
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"60px"}
                >
                  <InputLeftElement pointerEvents="none">
                    <IconButton
                      aria-label="Password-icon"
                      variant="unstyled"
                      fontSize="2xl"
                      icon={<PiLockLight />}
                    />
                  </InputLeftElement>
                  <Input
                    h={"30px"}
                    w={"full"}
                    position={"relative"}
                    mt={"7px"}
                    id={"password"}
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
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                    placeholder={"PASSWORD"}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password}
                  </FormErrorMessage>
                </InputGroup>
              </FormLabel>
            </Box>
            <Box>
              <FormLabel>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"60px"}
                >
                  <InputLeftElement pointerEvents="none">
                    <IconButton
                      aria-label="Password-icon"
                      variant="unstyled"
                      fontSize="2xl"
                      icon={<PiLockLight />}
                    />
                  </InputLeftElement>
                  <Input
                    h={"30px"}
                    w={"full"}
                    position={"relative"}
                    mt={"7px"}
                    border={"none"}
                    id={"confirmPassword"}
                    name={"confirmPassword"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                    placeholder={"CONFIRM PASSWORD"}
                  />
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword}
                  </FormErrorMessage>
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
        mt={smallerThan600 ? "4vh" : "0"}
        flexDirection={"column"}
      >
        <Box>
          <Center>
            <Button
              onClick={handleRegister}
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
          // bg={"red"}
          // mt={smallerThan1400 ? 0 : "2vh"}
          justifyContent={"center"}
          alignItems={"center"}
          // position={"relative"}
          // top={smallerThan1400 ? 0 : 5}
        >
          <Center>Already have an account?</Center>
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
              LOGIN HERE
            </Button>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
