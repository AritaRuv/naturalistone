"use client";
import {  Box, Button, Text, Grid } from "@chakra-ui/react";
import { IShowMenu } from "./page";
import ProjectCard from "./projectCard";


const Projects: React.FC<IShowMenu> = ({setShowMenu, showMenu}) => {
  const arrayProjects = [
    {name:"Nombre del Proyecto1", color: "orange.100"},
    {name:"Nombre del Proyecto2", color: "gray.100"},
    {name:"Nombre del Proyecto4", color: "orange.100"},
    {name:"Nombre del Proyecto3", color: "gray.300"},
  ];
  const handleClick = () => {};
  return (
    <>
      <Box pl={"5vw"}  w={"70vw"} onClick={handleClick}>
        <Box display={"flex"} flexDir={"row"} justifyContent={"space-between"} alignItems={"baseline"}>
          <Text textTransform={"uppercase"} textAlign={"start"} fontSize={"1.5rem"} fontWeight={"thin"}>PROJECTS DASHBOARD</Text>
          <Button h={"3vh"} display={"flex"} variant={"unstyled"} fontWeight={"light"} fontSize={"0.8rem"} textAlign={"end"}>+ ADD PROJECT</Button>
        </Box>
        <Box mt={"2vh"} display={"flex"} flexDir={"row"} justifyContent={"space-between"}>       
          <Grid 
            gap={3}
            border={"2px solid"}
            templateRows='repeat(3, 1fr)'
            templateColumns='repeat(3, 1fr)' 
            rounded={"sm"} 
            paddingY={"2vh"} 
            paddingX={"2vw"} 
            borderColor={"gray.200"} 
            w={"65vw"} 
            h={"75vh"}>
            {
              arrayProjects.map((proj,i)=>{
                return(
                  <ProjectCard project={proj} id={i}/>
                );
              })
            }
          </Grid>
        </Box>
      </Box>


    </>
  );
};

export default Projects;