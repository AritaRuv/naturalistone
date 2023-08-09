"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectByID } from "@/store/projects/actionsProjects";
import { ProjectsState } from "@/store/projects/typeProjects";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { UpdateProject } from "./modalUpdateProject";
import { DeleteProject } from "./modalDeleteProject";

const ProjecteInfo = ({ params }) => {
  const { idProjects } = params;
  const { project } = useAppSelector(
    (state: { projectsReducer: ProjectsState }) => state.projectsReducer
  );

  const dispatch = useAppDispatch();

  const {
    CustomerID,
    ProjectName,
    Shipping_Address,
    Shipping_City,
    Shipping_State,
    Shipping_ZipCode,
  } = project;

  useEffect(() => {
    dispatch(fetchProjectByID(idProjects));
  }, []);

  return (
    <>
      <Box pl={"4.5vw"} pt={"5vh"} w={"25vw"} h={"91vh"}>
        <Link href={"/profile"}>
          <Button
            h={"3vh"}
            display={"flex"}
            variant={"unstyled"}
            fontWeight={"light"}
            fontSize={"0.7rem"}
            textAlign={"end"}
          >
            ← BACK
          </Button>
        </Link>
        <Text fontSize={"1.2rem"} fontWeight={"normal"} w={"15vw"}>
          {ProjectName?.toUpperCase()}
        </Text>
        <VStack pl={"2vw"} pt={"2vh"} alignItems={"flex-start"} mt={"5vh"}>
          <Box>
            <Text
              borderLeft={"2px solid black"}
              pl={"1vh"}
              fontSize={"0.9rem"}
              fontWeight={"semibold"}
            >
              PROYECT INFORMATION
            </Text>
          </Box>
          <VStack pl={"1vw"} alignItems={"flex-start"}>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
                COMPANY
              </Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>
                NOMBRE DE LA COMPANY
              </Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
                EMAIL
              </Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>
                COMPANYEMAIL@HOT.COM
              </Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
                PHONE
              </Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>
                123 2344 5443
              </Text>
            </Box>
          </VStack>
        </VStack>
        <VStack pl={"2vw"} pt={"2vh"} alignItems={"flex-start"}>
          <Box>
            <Text
              borderLeft={"2px solid black"}
              pl={"1vh"}
              fontSize={"0.9rem"}
              fontWeight={"semibold"}
            >
              SHIPPING ADDRESS
            </Text>
          </Box>
          <VStack pl={"1vw"} alignItems={"flex-start"}>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
                ADDRESS
              </Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>
                {Shipping_Address ? Shipping_Address.toUpperCase() : "-"}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
                CITY
              </Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>
                {Shipping_City ? Shipping_City.toUpperCase() : "-"}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
                ZIP CODE
              </Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>
                {Shipping_ZipCode ? Shipping_ZipCode.toUpperCase() : "-"}
              </Text>
            </Box>
            <Box>
              <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
                STATE
              </Text>
              <Text fontSize={"0.9rem"} fontWeight={"thin"}>
                {Shipping_State ? Shipping_State.toUpperCase() : "-"}
              </Text>
            </Box>
          </VStack>
          <UpdateProject idProjects={idProjects} project={project} />
          <DeleteProject idProjects={idProjects} project={project} />
        </VStack>
      </Box>
    </>
  );
};

export default ProjecteInfo;
