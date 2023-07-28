"use client";
import { Box } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import ProjecteInfo from "./projectInfo";
import ProductsProjectContainer from "./productProjectContainer";


export default function Project() {

  return (
    <>
      <NavBar/>
      <Box display={"flex"} flexDir={"row"} justifyContent={"flex-start"}>
        <ProjecteInfo/>
        <ProductsProjectContainer/>
      </Box>
      
    </>
  );
}
