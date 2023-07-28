'use client'
import { Avatar, Box, useMediaQuery, Text, Center } from "@chakra-ui/react";


const ProjectCard = ({project, id}) => {
  
  return (
    <>
      <Center key={id} w={'300px'} h={'160px'} bg={project.color} rounded={'sm'} p={'10%'}>
        <Text textTransform={'uppercase'} fontWeight={'light'} textAlign={'center'} fontSize={'0.8rem'}>{project.name}</Text>
      </Center>
    </>
  );
}

export default ProjectCard