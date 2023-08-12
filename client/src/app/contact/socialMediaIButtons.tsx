import React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import "../assets/styleSheet.css";
import { IconType } from "react-icons";

export interface SocialMediaButtonsType {
  name: string;
  icon: IconType;
  content: string;
  id: number;
}

export const SocialMediaButtons: React.FC<SocialMediaButtonsType> = ({ name, icon, content, id }) => (
  <Box h="22vh" key={id} display="flex" flexDir="column" alignItems="center" w="15vw" position="relative">
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="50%"
      w="100%"
    >
      <Icon as={icon} className="custom-icon" fontWeight="thin" fontSize="3rem" aria-label="socialMediaButton" />
      <Box
        position="absolute"
        bottom={0}
        left="50%"
        transform="translateX(-50%)"
        w="10%" // Ajusta este valor para acortar la línea (por ejemplo, "20%" para una línea más corta)
        borderBottom="2px solid"
        borderBottomColor={"gray.900"}
        content="" // Se necesita un contenido para que el seudoelemento funcione
      />
    </Box>
    <Box mt="1vw" display="flex" flexDir="column" alignItems="center" h="50%" width="100%">
      <Text fontSize="0.9rem">{name}</Text>
      <Text fontSize="0.8rem" color="gray.500" textAlign="center">
        {content}
      </Text>
    </Box>
  </Box>
);



