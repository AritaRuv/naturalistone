"use client";
import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";

export default function NotFound(){
 
  return(
    <Box  mt={"100px"}  >
      <Center>
        <VStack>
          <Heading as='h2' size='2xl'>
            There was a problem
          </Heading>
          <Text>The page you requested could not be found</Text>
          <Button>GO BACK HOME</Button>
        </VStack>
      </Center>
    </Box>
  );
}