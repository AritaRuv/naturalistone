'use client'
import { Avatar, Box, Button, Text, Grid, SimpleGrid, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { IShowMenu } from "./page";
import ProjectCard from "./projectCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { ProjectsState } from "@/store/projects/typeProjects";
import { CreateNewProject } from "./addProjectModal";


const Projects: React.FC<IShowMenu> = ({setShowMenu, showMenu}) => {

  const customerProjects  = useAppSelector((state: { projectsReducer: ProjectsState }) => state.projectsReducer.customerProjects);
  

  const [isSmallerThan1520] = useMediaQuery("(max-width: 1520px)");

  const CustomerID = 1938
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectsCustomer(CustomerID));
  }, []);

  const handleClick = () => {}
  return (
    <>
    <Box pl={'5vw'}  w={'70vw'} onClick={handleClick}>
      <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'baseline'}>
        <Text textTransform={'uppercase'} textAlign={'start'} fontSize={'1.5rem'} fontWeight={'thin'}>PROJECTS DASHBOARD</Text>
        <CreateNewProject CustomerID={CustomerID}/>
      </Box>
      <Box mt={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>       
        <Grid 
        gap={3}
        border={'2px solid'}
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(3, 1fr)' 
        rounded={'sm'} 
        paddingY={'2vh'} 
        paddingX={'2vw'} 
        borderColor={'gray.200'} 
        w={'65vw'} 
        h={'75vh'}>
          {
            customerProjects.map((proj,i)=>{
              return(
                <ProjectCard project={proj} id={i}/>
              )
            })
          }
        </Grid>
      </Box>
  </Box>
    </>
  );
};

export default Projects;