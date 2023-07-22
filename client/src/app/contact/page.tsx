
'use client'
import { Box, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import NaturaliMap from "./googleMaps";
import { ContactImage } from "./contactImage";


export const Contact = () => {


  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");

  return (
    <>
      <NavBar />
      <Box>
        <ContactImage/>
      </Box>
      
    </>
  );
}

export default Contact