/* eslint-disable indent */
import { useEffect } from "react";
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
  Box,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteUserProject,
  fetchProjectsCustomer,
} from "@/store/projects/actionsProjects";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/app/appContext";
import { LoginState } from "@/store/login/typeLogin";

export function DeleteProject({ idProjects, project }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const handleSubmit = async () => {
    const response = await dispatch(deleteUserProject(idProjects));
    if (!response.success) {
      if (!toast.isActive("toastDeleteProject")) {
        return toast({
          id: "toastDeleteProject",
          title: "Delete project",
          description: "Error for delete the project",
          isClosable: true,
          status: "error",
        });
      }
    }
    appContext?.setShowMenu("projects");
    router.push("/profile");
    toast({
      id: "toastDeleteProject",
      title: "Delete project",
      description: `The project ${project.ProjectName} was delete successful`,
      isClosable: true,
      status: "success",
    });
    dispatch(fetchProjectsCustomer(user.CustomerID));
    onClose();
    return;
  };

  return (
    <>
      <Box>
        <Button
          h={"5px"}
          w={"5px"}
          fontWeight={"normal"}
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
          <Text fontSize={"0.8rem"} color={"#646464"}>
            Delete project
          </Text>
        </Button>
      </Box>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent
          w={"38vw"}
          minW={"400px"}
          h={"200px"}
          border={"2px solid"}
          rounded={"sm"}
          borderColor={"gray.300"}
        >
          <ModalCloseButton />
          <ModalBody>
            <Center h={"full"} w={"full"}>
              <Text fontSize={"1.4rem"}>
                Are you sure to delete the project {project.ProjectName}?
              </Text>
            </Center>
          </ModalBody>
          <ModalFooter
            h={"50px"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
          >
            <Button
              fontWeight={"normal"}
              border={"none"}
              type="submit"
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
              onClick={onClose}
            >
              No
            </Button>{" "}
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
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
