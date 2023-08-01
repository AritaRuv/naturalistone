'use client'
import { Avatar, Box, useMediaQuery, Text, Center } from "@chakra-ui/react";
import Link from "next/link";


const ProjectCard = ({project, id}) => {

const { ProjectName, idProjects } = project
  return (
    <Link href={`/profile/${ProjectName}/${idProjects}`}>
      <Center key={id} w={'300px'} h={'160px'} bg={'orange.100'} rounded={'sm'} p={'10%'}>
        <Text textTransform={'uppercase'} fontWeight={'light'} textAlign={'center'} fontSize={'0.8rem'}>{ProjectName}</Text>
      </Center>
    </Link>
  );
}

export default ProjectCard