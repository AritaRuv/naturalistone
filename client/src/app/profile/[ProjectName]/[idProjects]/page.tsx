'use client'
import { Box, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../../../_navBar/_navBar";
import { useState } from "react";
import ProjecteInfo from "./projectInfo";
import ProductsProjectContainer from "./productProjectContainer";


export default function Project({params}) {
  
  return (
    <>
      <NavBar/>
      <Box display={'flex'} flexDir={'row'} justifyContent={'flex-start'} >
        <ProjecteInfo params={params}/>
        <ProductsProjectContainer/>
      </Box>
      
    </>
  );
}
