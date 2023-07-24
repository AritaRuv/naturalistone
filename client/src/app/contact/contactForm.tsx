"use client";
import { Box, Button, Input, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const ContactForm: React.FC = () => {
  const [smallerThan640] = useMediaQuery("(max-width: 640px)");
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
              <Text fontSize={"md"}>Name</Text>
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
                <Text fontSize={"xs"}>First Name</Text>
                <Input
                  borderColor={"black"}
                  _hover={{ bg: "none" }}
                  borderRadius={"0px"}
                />
              </Box>
              <Box w={"full"}>
                <Text fontSize={"xs"}>Last Name</Text>
                <Input
                  borderColor={"black"}
                  _hover={{ bg: "none" }}
                  borderRadius={"0px"}
                />
              </Box>
            </Box>
            <Box display={"flex"} pt={"2vh"} flexDirection={"column"}>
              <Text fontSize={"md"}>Company</Text>
              <Input
                borderColor={"black"}
                _hover={{ bg: "none" }}
                borderRadius={"0px"}
              />
            </Box>
            <Box w={"full"} display={"flex"} flexDirection={"row"} pt={"2vh"}>
              <Text fontSize={"md"}>Email Address</Text>
              <Text color={"gray"} fontSize={"sm"} pl={"1vh"} pt={"0.3vh"}>
                (required)
              </Text>
            </Box>
            <Box display={"flex"} w={"full"} flexDirection={"row"} pt={"0.5vh"}>
              <Box display={"flex"} w={"full"}>
                <Input
                  borderColor={"black"}
                  _hover={{ bg: "none" }}
                  borderRadius={"0px"}
                />
              </Box>
            </Box>
            <Box w={"full"} display={"flex"} flexDirection={"row"} pt={"2vh"}>
              <Text fontSize={"md"}>Subject</Text>
              <Text color={"gray"} fontSize={"sm"} pl={"1vh"} pt={"0.3vh"}>
                (required)
              </Text>
            </Box>
            <Box display={"flex"} w={"full"} flexDirection={"row"} pt={"0.5vh"}>
              <Box display={"flex"} w={"full"}>
                <Input
                  borderColor={"black"}
                  _hover={{ bg: "none" }}
                  borderRadius={"0px"}
                />
              </Box>
            </Box>
            <Box w={"full"} display={"flex"} flexDirection={"row"} pt={"2vh"}>
              <Text fontSize={"md"}>Message</Text>
              <Text color={"gray"} fontSize={"sm"} pl={"1vh"} pt={"0.3vh"}>
                (required)
              </Text>
            </Box>
            <Box display={"flex"} w={"full"} flexDirection={"row"} pt={"0.5vh"}>
              <Box display={"flex"} w={"full"} h={"15vh"}>
                <Input
                  h={"15vh"}
                  borderColor={"black"}
                  _hover={{ bg: "none" }}
                  borderRadius={"0px"}
                />
              </Box>
            </Box>
            <Box pt={"2vh"}>
              <Button
                borderRadius={"0px"}
                bg={"#FFA762"}
                color={"white"}
                _hover={{ bg: "#FFB981" }}
                w={"8vw"}
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
