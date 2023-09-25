import { Center, Button, Text, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { motion } from "framer-motion";



const ImgButton = ({ name, material, color }: { name: string; material: string; color: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Center
        position="fixed"
        zIndex={90}
        top="70vh"
        h="20vh"
        w="100vw"
      >
        <Button variant="unstyled"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <Text textColor={color} fontWeight={isHovered ? "light" : "thin"} fontSize="0.9rem">
            {material}
          </Text>
          <Text textColor={color} fontWeight={isHovered ? "thin" : "hairline"} fontSize="2.2rem">
            {name}
          </Text>
          {
            isHovered === true && (
              <Button 
                as={motion.button}
                initial={{ opacity: 0, scale: 1, x: -100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={"1"}
                variant={"unstyled"}
              >
                <Text textColor={color} fontWeight={"light"} fontSize="0.9rem">
                  DISCOVER COLLECTION
                </Text>
              </Button>
            )
          }

        </Button>

      </Center>
      {
        isHovered === true && (
          <Box position={"fixed"} bg={"rgba(0, 0, 0, 0.35)"} h={"100vh"} w={"100vw"} zIndex={89}>

          </Box>
        )
      }
    </>
  );
};

export default ImgButton;
