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
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { validateCompletedEditInputsProject } from "@/utils/validateForms";
import { ErrorsProject } from "@/interfaces/other";
import { patchProject } from "@/store/projects/actionsProjects";

export function UpdateProject({ idProjects, project }) {
  
  const [errors, setErrors] = useState<ErrorsProject>({});
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    idProjects: idProjects,
    ProjectName: project?.ProjectName,
    Shipping_Address: project?.Shipping_Address,
    Shipping_ZipCode: project?.Shipping_ZipCode,
    Shipping_State: project?.Shipping_State,
    Shipping_City: project?.Shipping_City,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors(
      validateCompletedEditInputsProject({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleClose = () => {
    setFormData({
      idProjects: idProjects,
      ProjectName: project.ProjectName,
      Shipping_Address: project.Shipping_Address,
      Shipping_ZipCode: project.Shipping_ZipCode,
      Shipping_State: project.Shipping_State,
      Shipping_City: project.Shipping_City,
    });
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    setShowErrors(true);
    const newErrors = validateCompletedEditInputsProject(formData);
    if (
      Object.values(newErrors).length > 0 &&
      Object.values(errors).length > 0
    ) {
      return;
    }
    const data = await dispatch(patchProject(formData));
    if (!data.success) {
      if (!toast.isActive("updateProject")) {
        return toast({
          id: "updateProject",
          title: "Update Project",
          description: "Error in update project",
          isClosable: true,
          status: "error",
          duration: 4000,
        });
      }
    }
    if (!toast.isActive("updateProject")) {
      toast({
        id: "updateProject",
        title: "Update Project",
        description: "Project update successful",
        isClosable: true,
        status: "success",
        duration: 4000,
      });
    }
    setErrors({});
    onClose();
    return;
  };

  useEffect(() => {
    setFormData({
      idProjects: idProjects,
      ProjectName: project.ProjectName,
      Shipping_Address: project.Shipping_Address,
      Shipping_ZipCode: project.Shipping_ZipCode,
      Shipping_State: project.Shipping_State,
      Shipping_City: project.Shipping_City,
    });
  }, [project]);

  return (
    <>
      <Box>
        <Button
          h={"5px"}
          w={"5px"}
          fontWeight={"thin"}
          variant={"unstyled"}
          border={"none"}
          onClick={onOpen}
          _hover={{
            fontWeight: "semibold"
          }}
          fontSize={"0.8rem"}
          color={"logo.grey"}
        >
            Edit Information
        </Button>
      </Box>
      <Modal size={"2xl"} isOpen={isOpen} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent
          w={"38vw"}
          minW={"400px"}
          h={"600px"}
          // minH={"30vh"}
          border={"2px solid"}
          rounded={"sm"}
          borderColor={"gray.300"}
        >
          <ModalHeader>Edit Project</ModalHeader>
          <ModalCloseButton onClick={() => handleClose()} />
          <ModalBody>
            <VStack spacing={8}>
              <Box
                w={"70%"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
              >
                <FormControl>
                  <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
                    PROJECT NAME
                  </FormLabel>
                  <Input
                    mb={"0.5vh"}
                    variant="unstyled"
                    _placeholder={{
                      fontFamily: "body",
                      fontWeight: "inherit",
                    }}
                    fontSize={"0.8rem"}
                    borderBottomWidth={"2px"}
                    type={"text"}
                    name={"ProjectName"}
                    _focus={{
                      boxShadow: "0 0.5px 0.5px #FFFFFF inset, 0 0 5px #FFFFFF",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                    // value={formData.ProjectName}
                    defaultValue={project.ProjectName}
                    onChange={handleChange}
                  />
                  {showErrors && errors.ProjectName && (
                    <Text position={"absolute"} color={"red"} fontSize={"xs"}>
                      {errors.ProjectName}
                    </Text>
                  )}
                </FormControl>
              </Box>
              <Box
                w={"70%"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
              >
                <FormControl>
                  <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
                    ADDRESS
                  </FormLabel>
                  <Input
                    mb={"0.5vh"}
                    variant="unstyled"
                    _placeholder={{
                      fontFamily: "body",
                      fontWeight: "inherit",
                    }}
                    _focus={{
                      boxShadow: "0 0.5px 0.5px #FFFFFF inset, 0 0 5px #FFFFFF",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                    fontSize={"0.8rem"}
                    borderBottomWidth={"2px"}
                    type={"text"}
                    name={"Shipping_Address"}
                    defaultValue={project.Shipping_Address}
                    onChange={handleChange}
                  />
                  {showErrors && errors.Shipping_Address && (
                    <Text position={"absolute"} color={"red"} fontSize={"xs"}>
                      {errors.Shipping_Address}
                    </Text>
                  )}
                </FormControl>
              </Box>
              <Box
                w={"70%"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
              >
                <FormControl>
                  <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
                    CITY
                  </FormLabel>
                  <Input
                    mb={"0.5vh"}
                    variant="unstyled"
                    _placeholder={{
                      fontFamily: "body",
                      fontWeight: "inherit",
                    }}
                    _focus={{
                      boxShadow: "0 0.5px 0.5px #FFFFFF inset, 0 0 5px #FFFFFF",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                    fontSize={"0.8rem"}
                    borderBottomWidth={"2px"}
                    type={"text"}
                    name={"Shipping_City"}
                    defaultValue={project.Shipping_City}
                    onChange={handleChange}
                  />
                  {showErrors && errors.Shipping_City && (
                    <Text position={"absolute"} color={"red"} fontSize={"xs"}>
                      {errors.Shipping_City}
                    </Text>
                  )}
                </FormControl>
              </Box>
              <Box
                w={"70%"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
              >
                <FormControl>
                  <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
                    STATE
                  </FormLabel>
                  <Input
                    mb={"0.5vh"}
                    variant="unstyled"
                    _placeholder={{
                      fontFamily: "body",
                      fontWeight: "inherit",
                    }}
                    _focus={{
                      boxShadow: "0 0.5px 0.5px #FFFFFF inset, 0 0 5px #FFFFFF",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                    fontSize={"0.8rem"}
                    borderBottomWidth={"2px"}
                    type={"text"}
                    name={"Shipping_State"}
                    defaultValue={project.Shipping_State}
                    onChange={handleChange}
                  />
                  {showErrors && errors.Shipping_State && (
                    <Text position={"absolute"} color={"red"} fontSize={"xs"}>
                      {errors.Shipping_State}
                    </Text>
                  )}
                </FormControl>
              </Box>
              <Box
                w={"70%"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
              >
                <FormControl>
                  <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
                    ZIP CODE
                  </FormLabel>
                  <Input
                    mb={"0.5vh"}
                    variant="unstyled"
                    _placeholder={{
                      fontFamily: "body",
                      fontWeight: "inherit",
                    }}
                    _focus={{
                      boxShadow: "0 0.5px 0.5px #FFFFFF inset, 0 0 5px #FFFFFF",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                    fontSize={"0.8rem"}
                    borderBottomWidth={"2px"}
                    type={"text"}
                    name={"Shipping_ZipCode"}
                    defaultValue={project.Shipping_ZipCode}
                    onChange={handleChange}
                  />
                  {showErrors && errors.Shipping_ZipCode && (
                    <Text position={"absolute"} color={"red"} fontSize={"xs"}>
                      {errors.Shipping_ZipCode}
                    </Text>
                  )}
                </FormControl>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              fontWeight={"normal"}
              border={"none"}
              type="submit"
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
