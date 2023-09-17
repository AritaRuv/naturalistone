"use client";
import {
  Box,
  Center
} from "@chakra-ui/react";


const Footer: React.FC = () => {
  return (
    <Box display={"flex"} h={"10vh"} mt={"3vh"}  w={"full"} flexDirection={"column"}>
      <Box>
        <Center>Register now !</Center>
      </Box>
      <Box>
        <Center>5% off your first purchase up to 10000</Center>
      </Box>
    </Box>
  );
};

export default Footer;
