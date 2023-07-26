"use client";
import {
  Avatar,
  Box,
  useMediaQuery,
  Text,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { IShowMenu } from "./page";
import SideCard from "./sideCard";
import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";

const ProfileInfo: React.FC<IShowMenu> = ({
  setShowMenu,
  showMenu,
  user,
  isSmallThan750,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box
        pl={isSmallThan750 ? 0 : "5vw"}
        w={"70vw"}
        ml={isSmallThan750 ? 0 : "5vw"}
        mt={isSmallThan750 ? "5vh" : 0}
      >
        <Text textTransform={"uppercase"} fontSize={"1.9rem"}>
          PROFILE
        </Text>
        <Box
          w={"65vw"}
          mt={"2vh"}
          display={"flex"}
          flexDir={isSmallThan750 ? "column" : "row"}
          justifyContent={"space-between"}
        >
          <Box
            border={"2px solid"}
            rounded={"sm"}
            borderColor={"gray.200"}
            w={"40vw"}
            minW={"410px"}
            h={"50vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Box
              display={"flex"}
              h={"95%"}
              w={"95%"}
              flexDirection={"column"}
              pt={"20px"}
            >
              <Box>
                <Text fontSize={"md"}>Profile Settings</Text>
              </Box>
              <Box display={"flex"}>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"10px"}
                  // bg={"yellow"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      Full Name
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
                      value={user.Contact_Name}
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
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"10px"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      Phone
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
                      value={user.Phone}
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
                  </InputGroup>
                </Box>
              </Box>
              <Box display={"flex"}>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"10px"}
                  // bg={"yellow"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      State
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
                      id={"state"}
                      name={"state"}
                      fontSize={"sm"}
                      value={user.State}
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
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"10px"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      Zip Code
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
                      id={"zipCode"}
                      name={"zipCode"}
                      fontSize={"sm"}
                      value={user.ZipCode}
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
                  </InputGroup>
                </Box>
              </Box>
            </Box>
            <Box display={"flex"} h={"95%"} w={"95%"} flexDirection={"column"}>
              <Box>
                <Text fontSize={"md"}>Security</Text>
              </Box>
              <Box display={"flex"}>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"10px"}
                  // bg={"yellow"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      Email
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
                      value={user.Username}
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
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"10px"}
                >
                  <Box pl={"10px"}>
                    <Text fontSize={"sm"} color={"#646464"}>
                      Password
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
                      value={user.Password}
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
