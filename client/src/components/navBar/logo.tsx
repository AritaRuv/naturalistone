"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import NextImage from "next/image";
import logo from "../../app/assets/NaturalistoneLogo.png";
import Link from "next/link";
  
const Logo: React.FC = () => {

  const [ isMediumScreen ] = useMediaQuery("(max-width: 1200px)");

  return(
    <Box w={"14%"} minW={isMediumScreen ? "150px" : "200px"} minH={isMediumScreen ? "45px" : "60px"} display="flex" justifyContent="center" alignItems="center">
      <Link href={"/home"}>
        <NextImage src={logo} alt="Logo"/>
      </Link>
    </Box>
  );
};

export default Logo;