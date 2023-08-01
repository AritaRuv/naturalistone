"use client";
import {
  Box,
  Button,
  Input,
  InputGroup,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PostEmailToNaturali } from "@/api/apiPostmark";
import { EmailNaturali } from "@/utils/types";
import { validateInputsFormEmail } from "@/utils/validateForms";

const ContactForm: React.FC = () => {
  const [smallerThan640] = useMediaQuery("(max-width: 640px)");
  const [formData, setFormData] = useState<EmailNaturali>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<EmailNaturali>({});
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateInputsFormEmail({
        ...formData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleClick = async () => {
    setShowErrors(true);
    if (Object.keys(errors).length) return;
    setFormData({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      subject: "",
      message: "",
    });
    await PostEmailToNaturali(formData);
  };

  return (
    <>
      <Box h={"100vh"} w={smallerThan640 ? "100vw" : "35vw"} bg={"#f2f2f2"}>
        <Box
          // h={"30vh"}
          w={"full"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          flexDirection={"column"}
          // gap={"10px"}
          // bg={"blue"}
        >
          <Box display={"flex"} w={"90%"}>
            <Text fontSize={"md"}>
              Contact us here to discover the beauty of being attended in a
              Naturalistone way.
            </Text>
          </Box>
          <Box display={"flex"} w={"90%"} mt={"2vh"}>
            <Text fontSize={"md"}>
              You are invited to our showroom to see and feel the nicest array
              of material collections.
            </Text>
          </Box>
        </Box>
        <Box
          // bg={"yellow"}
          h={"full"}
          w={"full"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          flexDirection={"column"}
          pt={"2vh"}
        >
          <Box w={"90%"} h={"full"} flexDirection={"column"}>
            <Box w={"full"} display={"flex"} flexDirection={"row"}>
              <Text fontSize={"md"} color={"#646464"}>
                Name
              </Text>
              <Text color={"gray"} fontSize={"sm"} pl={"1vh"} pt={"0.3vh"}>
                (required)
              </Text>
            </Box>
            <Box
              display={"flex"}
              w={"full"}
              flexDirection={"row"}
              pt={"0.5vh"}
              gap={"10px"}
            >
              <Box w={"full"}>
                <Text fontSize={"xs"} color={"#646464"}>
                  First Name
                </Text>
                <InputGroup display={"flex"} flexDirection={"column"}>
                  <Input
                    w={"full"}
                    id={"firstName"}
                    name={"firstName"}
                    value={formData.firstName}
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
                  />
                  {showErrors && (
                    <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                      {errors.firstName}
                    </Text>
                  )}
                </InputGroup>
              </Box>
              <Box w={"full"}>
                <Text fontSize={"xs"} color={"#646464"}>
                  Last Name
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"63px"}
                >
                  <Input
                    w={"full"}
                    position={"relative"}
                    id={"lastName"}
                    name={"lastName"}
                    value={formData.lastName}
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
                  />
                  {showErrors && (
                    <Text color={"red"} fontSize={"xs"}>
                      {errors.lastName}
                    </Text>
                  )}
                </InputGroup>
              </Box>
            </Box>
            <Box display={"flex"} pt={"1vh"} flexDirection={"column"}>
              <Text fontSize={"md"} color={"#646464"}>
                Company
              </Text>
              <InputGroup display={"flex"} flexDirection={"column"} h={"63px"}>
                <Input
                  w={"full"}
                  id={"company"}
                  name={"company"}
                  value={formData.company}
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
                />
              </InputGroup>
            </Box>
            <Box w={"full"} display={"flex"} flexDirection={"row"} pt={"1vh"}>
              <Text fontSize={"md"} color={"#646464"}>
                Email Address
              </Text>
              <Text color={"gray"} fontSize={"sm"} pl={"1vh"} pt={"0.3vh"}>
                (required)
              </Text>
            </Box>
            <Box display={"flex"} w={"full"} flexDirection={"row"} pt={"0.5vh"}>
              <Box display={"flex"} w={"full"}>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"63px"}
                >
                  <Input
                    w={"full"}
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
                  />
                  {showErrors && (
                    <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                      {errors.email}
                    </Text>
                  )}
                </InputGroup>
              </Box>
            </Box>
            <Box w={"full"} display={"flex"} flexDirection={"row"} pt={"1vh"}>
              <Text fontSize={"md"} color={"#646464"}>
                Subject
              </Text>
              <Text color={"gray"} fontSize={"sm"} pl={"1vh"} pt={"0.3vh"}>
                (required)
              </Text>
            </Box>
            <Box display={"flex"} w={"full"} flexDirection={"row"} pt={"0.5vh"}>
              <Box display={"flex"} w={"full"}>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"63px"}
                >
                  <Input
                    w={"full"}
                    id={"subject"}
                    name={"subject"}
                    value={formData.subject}
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
                  />
                  {showErrors && (
                    <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                      {errors.subject}
                    </Text>
                  )}
                </InputGroup>
              </Box>
            </Box>
            <Box w={"full"} display={"flex"} flexDirection={"row"} pt={"1vh"}>
              <Text fontSize={"md"} color={"#646464"}>
                Message
              </Text>
              <Text color={"gray"} fontSize={"sm"} pl={"1vh"} pt={"0.3vh"}>
                (required)
              </Text>
            </Box>
            <Box display={"flex"} w={"full"} flexDirection={"row"} pt={"0.5vh"}>
              <Box display={"flex"} w={"full"} h={"15vh"}>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"63px"}
                >
                  <Input
                    // h={"15vh"}
                    id={"message"}
                    name={"message"}
                    value={formData.message}
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
                  />
                  {showErrors && (
                    <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                      {errors.message}
                    </Text>
                  )}
                </InputGroup>
              </Box>
            </Box>
            <Box pt={"2vh"}>
              <Button
                borderRadius={"0px"}
                bg={"#FFA762"}
                color={"white"}
                _hover={{ bg: "#FFB981" }}
                w={"8vw"}
                onClick={handleClick}
              >
                SUBMIT
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContactForm;
