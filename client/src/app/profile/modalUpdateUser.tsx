/* eslint-disable indent */
import {
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
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { patchUser } from "@/store/login/actionsLogin";
import { validateCompletedInputsProfile } from "@/utils/validateForms";
import { ErrorsProfile } from "@/utils/types";

export function UpdateCustomer({
  title,
  value,
  formData,
  setFormData,
  name,
  id,
}) {
  const [errors, setErrors] = useState<ErrorsProfile>({});
  const toast = useToast();
  const [isToastShowing, setIsToastShowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changeInput, setChangeInput] = useState(false);
  const dispatch = useAppDispatch();
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (event) => {
    // setErrors({});
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateCompletedInputsProfile({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleClose = () => {
    setFormData({
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
    setShowErrors(true);
    if (errors && errors[name]?.length) {
      return;
    }
    dispatch(patchUser(formData));
    setErrors({});
    onClose();
    return;
  };

  function placeHolder(name) {
    switch (name) {
      case "fullName":
        return "Jon Doe";
      case "password":
        return "Password";
      case "phone":
        return "+1 XXX XXX XXXX";
      case "company":
        return "Company";
      case "companyPosition":
        return "Company Role";
      case "email":
        return "Email";
      case "billingAddress":
        return "Address";
      case "billingState":
        return "State";
      case "billingCity":
        return "City";
      case "billingZipCode":
        return "Zip code";
      case "address":
        return "Address";
      case "state":
        return "State";
      case "city":
        return "City";
      case "zipCode":
        return "Zip code";
    }
  }

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
          <Text fontSize={"0.7rem"} color={"#646464"} _hover={{fontWeight: "semibold"}}>
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
          minW={"400px"}
          h={"250px"}
          // minH={"30vh"}
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
              // bg={"red"}
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
                placeholder={placeHolder(name)}
                onChange={handleChange}
                _focus={{
                  boxShadow: "0 0.5px 0.5px #FFFFFF inset, 0 0 5px #FFFFFF",
                }}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0", // Ajusta el radio de las esquinas a cero
                  outline: "none",
                }}
              />
            </InputGroup>
            {showErrors && (
              <Text color={"red"} fontSize={"xs"} ml={"50px"}>
                {errors[name]}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              fontWeight={"sm"}
              border={"none"}
              // bg={"yellow"}
              backgroundColor={"transparent"}
              _hover={{
                backgroundColor: "transparent",
              }}
              _focus={{
                backgroundColor: "transparent",
                border: "none",
              }}
              mt={"5px"}
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
