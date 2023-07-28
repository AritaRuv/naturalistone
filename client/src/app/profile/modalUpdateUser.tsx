import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Box,
  Text,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { HiUserAdd } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { patchUser } from "@/store/login/actionsLogin";

export function UpdateCustomer({
  title,
  value,
  handleChange,
  formData,
  setFormData,
  name,
  id,
}) {
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const [isToastShowing, setIsToastShowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changeInput, setChangeInput] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setFormData({
      customerId: "",
      fullName: "",
      company: "",
      email: "",
      phone: "",
      state: "",
      address: "",
      password: "",
      zipCode: "",
      billingAddress: "",
      billingState: "",
      city: "",
      companyPosition: "",
    });
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    onClose();
    dispatch(patchUser(formData));
  };

  console.log("formdata", formData);

  return (
    <>
      <Box>
        <Button
          h={"5px"}
          w={"5px"}
          fontWeight={"sm"}
          border={"none"}
          backgroundColor={"transparent"}
          _hover={{
            backgroundColor: "transparent",
          }}
          _focus={{
            backgroundColor: "transparent",
            border: "none",
          }}
          onClick={onOpen}
        >
          <Text fontSize={"xs"} color={"#646464"}>
            Edit
          </Text>
        </Button>
      </Box>
      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={() => handleClose()}
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent
          w={"30vw"}
          minW={"20vw"}
          border={"2px solid"}
          rounded={"sm"}
          borderColor={"gray.300"}
        >
          <ModalHeader color={"web.text"}>Edit Profile</ModalHeader>
          <ModalCloseButton onClick={() => handleClose()} />
          <ModalBody>
            <Box pl={"30px"}>
              <Text fontSize={"sm"} color={"#646464"}>
                {title}
              </Text>
            </Box>
            <InputGroup
              display={"flex"}
              flexDirection={"column"}
              h={"50px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Input
                h={"40px"}
                w={"70%"}
                position={"relative"}
                id={id}
                name={name}
                fontSize={"sm"}
                mr={"30px"}
                defaultValue={value}
                border={"none"}
                onChange={handleChange}
                _focus={{
                  boxShadow: "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                }}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0", // Ajusta el radio de las esquinas a cero
                  outline: "none",
                }}
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              fontWeight={"sm"}
              border={"none"}
              backgroundColor={"transparent"}
              _hover={{
                backgroundColor: "transparent",
              }}
              _focus={{
                backgroundColor: "transparent",
                border: "none",
              }}
              mr={3}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
