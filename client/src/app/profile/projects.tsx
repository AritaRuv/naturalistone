import { Box, Text, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import { IShowMenu } from "./page";
import ProjectCard from "./projectCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { ProjectsState } from "@/store/projects/typeProjects";
import { CreateNewProject } from "./addProjectModal";

const Projects: React.FC<IShowMenu> = () => {
  
  const customerProjects = useAppSelector((state: { projectsReducer: ProjectsState }) => state.projectsReducer.customerProjects);

  const [isSmallerThan1520] = useMediaQuery("(max-width: 1520px)");


  const CustomerID = 1938;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectsCustomer(CustomerID));
  }, []);

  return (
    <>
      <Box
        pl={"5vw"}
        w={"75vw"}
      >
        <Box 
          display={"flex"}
          flexDir={"row"} 
          justifyContent={"space-between"} 
          alignItems={"baseline"}>
          <Text
            textTransform={"uppercase"}
            fontSize={"1.9rem"}
          >
          PROJECT DASHBOARD
          </Text>
          <CreateNewProject CustomerID={CustomerID} />
        </Box>
        <SimpleGrid
          mt={"5vh"}
          overflow={"auto"} 
          h={"40vh"} 
          columns={isSmallerThan1520 ? 2 : 5}
          gap={3}
        >
          {customerProjects.map((proj, i) => {
            return <ProjectCard project={proj} key={i} id={i} />;
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Projects;