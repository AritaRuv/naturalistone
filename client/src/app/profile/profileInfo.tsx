"use client";
import {
  Box,
  useMediaQuery,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  IconButton
} from "@chakra-ui/react";
import { IShowMenu } from "./page";
import { useState } from "react";
import { UpdateCustomer } from "./modalUpdateUser";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";


const ProfileInfo: React.FC<IShowMenu> = ({
  user,
  isSmallThan750,
  formData,
  setFormData
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
        mt={isSmallThan750 ? "5vh" : 0}
      >
        <Text
          textTransform={"uppercase"}
          fontSize={"1.9rem"}
        >
          PROFILE
        </Text>
        <Box
          justifyContent={"flex-start"}
          h={"40vh"}
          mt={"5vh"}
          display={"flex"}
          flexDir={
            isSmallThan1000 ? "column" : isSmallThan750 ? "column" : "row"
          }
        >
          <Box
            mr={"2vw"}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            flexDirection={"column"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
            >
              <Text fontSize={"1rem"}>USER SETTINGS</Text>
              <Box  
                mt={"2vh"}
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mr={"3vw"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      FULL NAME
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                  >
                    <Input
                      h={"30px"}
                      w={"250px"}
                      position={"relative"}
                      id={"fullName"}
                      name={"fullName"}
                      fontSize={"0.9rem"}
                      value={user?.Contact_Name}
                      border={"none"}
                      isReadOnly={true}
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
                      id={"fullName"}
                      name={"fullName"}
                      value={user?.Contact_Name}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      PHONE
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                  >
                    <Input
                      h={"30px"}
                      w={"250px"}
                      position={"relative"}
                      id={"phone"}
                      name={"phone"}
                      fontSize={"0.9rem"}
                      value={user?.Phone}
                      border={"none"}
                      isReadOnly={true}
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
                      id={"phone"}
                      name={"phone"}
                      value={user?.Phone}
                      // handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
                mt={"2vh"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mr={"3vw"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      COMPANY
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Input
                      h={"30px"}
                      w={"250px"}
                      position={"relative"}
                      id={"company"}
                      name={"company"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Company}
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
                      title={"Company"}
                      id={"company"}
                      name={"company"}
                      value={user?.Company}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      COMPANY ROLE
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Input
                      h={"30px"}
                      w={"250px"}
                      position={"relative"}
                      id={"companyPosition"}
                      name={"companyPosition"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Company_Position}
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
                      title={"Company Position"}
                      id={"companyPosition"}
                      name={"companyPosition"}
                      value={user?.Company_Position}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
            <Box
              mt={"4vh"}
              display={"flex"}
              flexDirection={"column"}  
            >
              <Text fontSize={"1rem"}>SECURITY</Text>
              <Box
                mt={"2vh"}
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mr={"3vw"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                    EMAIL
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Input
                      h={"30px"}
                      w={"250px"}
                      position={"relative"}
                      id={"email"}
                      name={"email"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Username}
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
                      title={"Email"}
                      id={"email"}
                      name={"email"}
                      value={user?.Username}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box  
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                    PASSWORD
                  </Text>

                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Input
                      h={"30px"}
                      w={"250px"}
                      position={"relative"}
                      id={"password"}
                      name={"password"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Password}
                      border={"none"}
                      type={showPassword ? "type" : "password"}
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
                      top={"-5px"}
                      aria-label="Password-icon"
                      fontSize="xl"
                      onClick={handleShowPassword}
                    >
                      {
                        showPassword ?
                          <IconButton
                            aria-label="Password-icon"
                            variant="unstyled"
                            fontSize="2xl"
                            display={"flex"}
                            textAlign={"center"}
                            icon={<PiEyeSlashThin />}
                          /> :
                          <IconButton
                            aria-label="Password-icon"
                            variant="unstyled"
                            fontSize="2xl"
                            display={"flex"}
                            textAlign={"center"}
                            icon={<PiEyeThin />}
                          />
                      }
                    </InputRightElement>
                    <UpdateCustomer
                      title={"Password"}
                      id={"password"}
                      name={"password"}
                      value={user?.Password}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            flexDirection={"column"}>
            <Text fontSize={"1rem"}>OTHER THINGS</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileInfo;
