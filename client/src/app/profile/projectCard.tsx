"use client";
import { Text, Center, Box } from "@chakra-ui/react";
import Link from "next/link";
import NextImage from "next/image";


const ProjectCard = ({project, id, img}) => {

  const { ProjectName, idProjects } = project;
  return (
    <Link href={`/profile/${ProjectName}/${idProjects}`}>
      <Center 
        key={id} 
        minW={"540px"} 
        h={"360px"} 
        position={"relative"} 
        overflow={"hidden"}>
        <NextImage objectFit="cover" fill src={img} alt="img" />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.3)"
        />
        <Text 
          textTransform={"uppercase"} 
          fontWeight={"light"} 
          color={"white"}
          textAlign={"center"} 
          fontSize={"1rem"}
          position={"relative"}>{ProjectName}</Text>
      </Center>
    </Link>
  );
};

export default ProjectCard;