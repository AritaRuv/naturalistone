'use client'
import { Box, useMediaQuery, Text, Divider, Icon } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import NaturaliMap from "./googleMaps";
import { ContactImage } from "./contactImage";
import { SocialMediaContainer } from "./socialMedia";
import { PiCaretDoubleDownThin } from 'react-icons/pi'

export const Contact = () => {

  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <NavBar />
      <Box>
        <ContactImage />
      </Box>
      <SocialMediaContainer />
      <Box display={'flex'} flexDir={'column'} alignItems={'center'} h={'20vh'}>
        <Divider mt={'5vh'} w={'80%'} borderColor={'gray.300'}/>
        <Text mt={'5vh'}>CONTACT US DIRECTLY</Text>
        <Icon mt={'3vh'} as={PiCaretDoubleDownThin} className="custom-icon" fontWeight="thin" fontSize="2rem" display="flex" alignContent="center" aria-label="socialMediaButton" />
      </Box>
    </>
  );
}

export default Contact;
