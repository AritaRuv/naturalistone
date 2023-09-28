import React from "react";
import { Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure  } from "@chakra-ui/react";
import { PiPlusCircleBold } from "react-icons/pi";
import { AddresForm } from "./AddresForm";
import { Address } from "./AddressInterface";
import { useAppSelector } from "@/store/hooks";
import { LoginState } from "@/store/login/typeLogin";

const AddressBoxNew = () => {

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const newAddress : Address = {
    Nickname: "",
    AddressId: 0,
    CustomerId: user.CustomerID,
    Address: "",
    Address2: "",
    City: "",
    State: "",
    ZipCode: ""
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddresForm addressData={newAddress} onClose={onClose} />
          </ModalBody>       
        </ModalContent>
      </Modal>

      <Box bgColor={"facebook.100"} key={-1}
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
