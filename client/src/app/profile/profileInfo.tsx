"use client";
import {
  Avatar,
  Box,
  useMediaQuery,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { IShowMenu } from "./page";
import SideCard from "./sideCard";
import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { updateUser } from "@/api/apiLogin";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { UpdateCustomer } from "./modalUpdateUser";

const ProfileInfo: React.FC<IShowMenu> = ({
  setShowMenu,
  showMenu,
  user,
  isSmallThan750,
  formData,
  setFormData,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSmallThan1000] = useMediaQuery("(max-width: 1000px)");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box
        pl={isSmallThan750 ? 0 : "5vw"}
        w={isSmallThan750 ? "100vw" : "70vw"}
        ml={isSmallThan750 ? 0 : "5vw"}
        mt={isSmallThan750 ? "5vh" : 0}
        // bg={"red"}
      >
        <Text
          textTransform={"uppercase"}
          fontSize={"1.9rem"}
          ml={isSmallThan750 ? "2vw" : 0}
        >
          PROFILE
        </Text>
        <Box
          w={"65vw"}
          mt={"2vh"}
          display={"flex"}
          flexDir={
            isSmallThan1000 ? "column" : isSmallThan750 ? "column" : "row"
          }
          justifyContent={"space-between"}
          // bg={"yellow"}
        >
          <Box
            border={"2px solid"}
            rounded={"sm"}
            borderColor={"gray.200"}
            w={isSmallThan750 ? "100vw" : "40vw"}
            minW={"400px"}
            h={"full"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            p={"20px"}
          >
            <Box
              display={"flex"}
              h={"95%"}
              w={"95%"}
              flexDirection={"column"}
              // pt={"20px"}
              // p={"10px"}
            >
              <Box>
                <Text fontSize={"md"}>PROFILE SETTINGS</Text>
              </Box>
              <Box
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
                // bg={"blue"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                  // bg={"yellow"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      FULL NAME
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    // bg={"green"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"fullName"}
                      name={"fullName"}
                      fontSize={"sm"}
                      value={user?.Contact_Name}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Full Name"}
                      value={user?.Contact_Name}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      PHONE
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"phone"}
                      name={"phone"}
                      fontSize={"sm"}
                      value={user?.Phone}
                      border={"none"}
                      // onChange={handleChange}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Phone"}
                      value={user?.Phone}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                  // bg={"yellow"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      COMPANY
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    pl={"10px"}
                    // bg={"green"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"company"}
                      name={"company"}
                      fontSize={"sm"}
                      value={user?.Company}
                      border={"none"}
                      // onChange={handleChange}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Company"}
                      value={user?.Company}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      COMPANY ROLE
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"CompanyPosition"}
                      name={"CompanyPosition"}
                      fontSize={"sm"}
                      value={user?.Company_Position}
                      border={"none"}
                      // onChange={handleChange}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Company Position"}
                      value={user?.Company_Position}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              h={"95%"}
              w={"95%"}
              flexDirection={"column"}
              mt={"10px"}
              // bg={"yellow"}
            >
              <Box>
                <Text fontSize={"md"}>SECURITY</Text>
              </Box>
              <Box
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                  // bg={"yellow"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      EMAIL
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    // bg={"green"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"email"}
                      name={"email"}
                      fontSize={"sm"}
                      value={user?.Username}
                      border={"none"}
                      // onChange={handleChange}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Email"}
                      value={user?.Username}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                >
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      PASSWORD
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"password"}
                      name={"password"}
                      fontSize={"sm"}
                      value={user?.Password}
                      border={"none"}
                      type={showPassword ? "type" : "password"}
                      // onChange={handleChange}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <InputRightElement
                      aria-label="Password-icon"
                      // variant="unstyled"
                      fontSize="xl"
                      onClick={handleShowPassword}
                    >
                      <BsEyeSlash />
                    </InputRightElement>
                    <UpdateCustomer
                      title={"Password"}
                      value={user?.Password}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
          </Box>
          <SideCard isSmallThan750={isSmallThan750} />
        </Box>
        {/* <
     
      <Box display={'flex'} flexDir={'column'} pl={'5vw'} h={'70vh'} justifyContent={'space-evenly'} border={'2px solid red'}>
       
    </Box> */}
      </Box>
    </>
  );
};

export default ProfileInfo;
