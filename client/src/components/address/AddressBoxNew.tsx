import React from "react";
import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure  } from "@chakra-ui/react";
import { PiPlusCircleBold } from "react-icons/pi";
import { AddresForm } from "./AddresForm";

const AddressBoxNew = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddresForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>Save</Button>
            <Button  onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bgColor={"facebook.50"} key={-1}
        rounded={"5"}
        h={"210px"}>
        <Center width={"full"} height={"full"}>
          <VStack onClick={onOpen}>
            <PiPlusCircleBold size={"50px"}/>
            <Text>Add new Address</Text>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default AddressBoxNew;
