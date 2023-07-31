"use client";
import { Box, Text, Divider, Icon } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import NaturaliMap from "./googleMaps";
import { ContactImage } from "./contactImage";
import { SocialMediaContainer } from "./socialMedia";
import { PiCaretDoubleDownThin } from "react-icons/pi";
import ContactForm from "./contactForm";

export const Contact = () => {

  return (
    <>
      <NavBar />
      <Box>
        <ContactImage />
      </Box>
      <SocialMediaContainer />
      <Box display={"flex"} flexDir={"column"} alignItems={"center"} h={"20vh"}>
        <Divider mt={"5vh"} w={"80%"} borderColor={"gray.300"} />
        <Text mt={"5vh"}>CONTACT US DIRECTLY</Text>
        <Icon
          mt={"3vh"}
          as={PiCaretDoubleDownThin}
          className="custom-icon"
          fontWeight="thin"
          fontSize="2rem"
          display="flex"
          alignContent="center"
          aria-label="socialMediaButton"
        />
        <Box display={"flex"} w={"65vw"} flexDir={"row"} justifyContent={"space-between"} mt={"10vh"}>
          <ContactForm/>
          <NaturaliMap/>
        </Box>
        
      </Box>
    </>
  );
};

export default Contact;

