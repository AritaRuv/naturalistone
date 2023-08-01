"use client";
import { Box } from "@chakra-ui/react";
import NextImage from "next/image";
import logo from "../../app/assets/NaturalistoneLogo.png";
import Link from "next/link";
  
const Logo: React.FC = () => {
    
  return(
    <Box w={"14%"} minW={"200px"} minH={"60px"} display="flex" justifyContent="center" alignItems="center">
      <Link href={"/home"}>
        <NextImage src={logo} alt="Logo"/>
      </Link>
    </Box>
  );
};

export default Logo;