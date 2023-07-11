"use client";
import { Box } from "@chakra-ui/react";
import NextImage from 'next/image';
import logo from '../assets/NaturalistoneLogo.png';
  
  const Logo: React.FC = () => {
    
    return(
        <Box w={'14%'} minW={'200px'} minH={'60px'} display="flex" justifyContent="center" alignItems="center">
          <NextImage src={logo} alt="Logo"/>
        </Box>
    )
  }

    export default Logo;