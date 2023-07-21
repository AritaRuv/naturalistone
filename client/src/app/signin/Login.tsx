"use client";
import { useAppDispatch } from "@/store/hooks";
import { signinUser } from "@/store/login/actionsLogin";
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
  const [formData, setFormData] = useState<Signin>({
    email: "",
    password: "",
  });

  console.log("formdataaaaaaaaaaaa", formData);
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<FormErrorsLogin>({});
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleChange = (event) => {
    // setErrors({});
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    const errors = validateCompletedInputsLogin({
      ...formData,
      [name]: value,
    });

    // Comprobar si hay errores en el campo "email"
    const isEmailInvalid = !!errors.email;
    // Comprobar si hay errores en el campo "password"
    const isPasswordInvalid = !!errors.password;

    // Combinar todos los resultados para obtener isFormInvalid (true si hay errores en al menos un campo, false si no hay errores en ningún campo)
    const formHasErrors: any = isEmailInvalid || isPasswordInvalid;
    // Establecer los errores y la propiedad isInvalid en el estado
    setErrors(errors);
    setIsFormInvalid(formHasErrors);
  };

  console.log("errosss", errors);

  const handleClick = () => {
    setActiveLogin(false);
  };

  const handleLogin = () => {
    // dispatch(signinUser(formData));
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <Box
      display={"flex"}
      h={smallerThan600 ? "60vh" : "68vh"}
      w={smallerThan600 ? "100vw" : "35vw"}
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
          bottom={smallerThan600 ? 12 : 14}
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
          <FormControl>
            <FormLabel>
              <InputGroup>
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
                  {errors.email && errors.email}
                </FormErrorMessage>
              </InputGroup>
            </FormLabel>
            <FormLabel>
              <InputGroup display={"flex"} mt={"20px"}>
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
                  name={"password"}
                  value={formData.password}
                  border={"none"}
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
          </FormControl>
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
          <Center>LOGIN</Center>
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
