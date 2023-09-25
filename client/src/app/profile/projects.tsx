import { Box, Text, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import ProjectCard from "./projectCard";
import { useAppSelector } from "@/store/hooks";
import { ProjectsState } from "@/store/projects/typeProjects";
import { CreateNewProject } from "./addProjectModal";
import { LoginState } from "@/store/login/typeLogin";
import { IShowMenu } from "@/interfaces/profile";

const Projects: React.FC<IShowMenu> = () => {

  const customerProjects = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer.customerProjects
  );

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const [isSmallerThan1520] = useMediaQuery("(max-width: 1520px)");

  const URL = [
    "https://naturalistone-images.s3.amazonaws.com/muestra/henry-co-ko9MNaatfuI-unsplash.jpg",
    "https://naturalistone-images.s3.amazonaws.com/muestra/augustine-wong-Ai1DGl5ED5g-unsplash.jpg",
    "https://naturalistone-images.s3.amazonaws.com/muestra/bernard-hermant-u7VDgNGb78w-unsplash.jpg",
    "https://naturalistone-images.s3.amazonaws.com/muestra/milad-fakurian-c10tq-bB52Y-unsplash.jpg",
    "https://naturalistone-images.s3.amazonaws.com/muestra/ricardo-gomez-angel-dEtMGTcgytU-unsplash.jpg",
    "https://naturalistone-images.s3.amazonaws.com/muestra/davidcohen-wD5LMt3ElT4-unsplash.jpg",
    "https://naturalistone-images.s3.amazonaws.com/muestra/callum-shaw-Se-KWWW19mA-unsplash.jpg",
    "https://naturalistone-images.s3.amazonaws.com/muestra/jean-philippe-delberghe-ciEqDz2ysg8-unsplash.jpg",
    "https://naturalistone-images.s3.amazonaws.com/muestra/charlesdeluvio-yCzY0pnrhWo-unsplash.jpg",
  ];

  return (
    <>
      <Box pl={"5vw"} w={"75vw"}>
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Text textTransform={"uppercase"} fontSize={"1.9rem"}>
            PROJECT DASHBOARD
          </Text>
          <CreateNewProject CustomerID={user.CustomerID} />
        </Box>
        <SimpleGrid
          mt={"5vh"}
          overflow={"auto"}
          h={"40vh"}
          columns={isSmallerThan1520 ? 1 : 2}
          gap={3}
        >
          { typeof customerProjects !== "string" &&
            customerProjects.map((proj, i) => {
              return <ProjectCard project={proj} key={i} id={i} img={URL[i]} />;
            })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Projects;
