"use client";
import { Box } from "@chakra-ui/react";
import ProjecteInfo from "./projectInfo";
import ProductsProjectContainer from "./productProjectContainer";


export default function Project({params}) {
  
  return (
    <>
      <Box display={"flex"} flexDir={"row"} justifyContent={"flex-start"} >
        <ProjecteInfo params={params}/>
        <ProductsProjectContainer/>
      </Box>
      
    </>
  );
}
