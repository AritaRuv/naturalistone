import { Avatar, Box, Button, Text, SimpleGrid, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { IShowMenu } from "./page";
import ProjectCard from "./projectCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { ProjectsState } from "@/store/projects/typeProjects";
import { CreateNewProject } from "./addProjectModal";

const Projects: React.FC<IShowMenu> = ({ setShowMenu, showMenu }) => {
  
  const customerProjects = useAppSelector((state: { projectsReducer: ProjectsState }) => state.projectsReducer.customerProjects);

  const [isSmallerThan1520] = useMediaQuery("(max-width: 1520px)");
  const [isSmallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [isSmallerThan740] = useMediaQuery("(max-width: 740px)");

  const CustomerID = 1938;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectsCustomer(CustomerID));
  }, []);

  const handleClick = () => {};

  return (
    <>
      <Box pl={'5vw'} 
         w={!isSmallerThan1520 ? '70vw' : 
              isSmallerThan1200 ? '74vw' 
            : '57vw'} onClick={handleClick} pr={isSmallerThan1520 ? '5vw' : ''}>
        <Box display={'flex'} flexDir={'row'} justifyContent={'space-between'} alignItems={'baseline'}>
          <Text textTransform={'uppercase'} textAlign={'start'} fontSize={'1.5rem'} fontWeight={'thin'}>PROJECTS DASHBOARD</Text>
          <CreateNewProject CustomerID={CustomerID} />
        </Box>
        <Box mt={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>
          {/* Utilizamos SimpleGrid en lugar de Grid */}
          <SimpleGrid
            columns={isSmallerThan1520 ? 2 : 3} // 2 columnas si la pantalla es menor que 1520px, 3 columnas en caso contrario
            gap={3}
            border={'2px solid'}
            rounded={'sm'}
            paddingY={'2vh'}
            paddingX={'2vw'}
            borderColor={'gray.200'}
            w={'65vw'}
            h={'75vh'}
          >
            {customerProjects.map((proj, i) => {
              return <ProjectCard project={proj} key={i} id={i} />;
            })}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}

export default Projects;