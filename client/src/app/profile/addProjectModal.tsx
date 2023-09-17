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
} from "@chakra-ui/react";
import { useState } from "react";
import CreateProjectForm from "./createProjectForm";
import { postCustomerProject } from "@/store/projects/actionsProjects";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchFavorites,
  postFavoritesProductInProject,
} from "@/store/favorites/actionsFavorites";
import { validateCompletedEditInputsProject } from "@/utils/validateForms";
import { ErrorsProject } from "@/interfaces/other";
import { PropsNewProject } from "@/interfaces/projects";


export const CreateNewProject: React.FC<PropsNewProject> = ({
  CustomerID,
  postProductProject,
  ProdNameID,
}) => {
  const [errors, setErrors] = useState<ErrorsProject>({});
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changeInput, setChangeInput] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState({
    ProjectName: "",
    Shipping_State: "",
    Shipping_ZipCode: "",
    Shipping_City: "",
    Shipping_Address: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setShowErrors(true);
    const newErrors = validateCompletedEditInputsProject(formData);
    if (
      Object.values(newErrors).length > 0 ||
      Object.values(errors).length > 0
    ) {
      setErrors(newErrors);
      return;
    } else {
      const response = await dispatch(
        postCustomerProject(CustomerID, formData)
      );
      if (!response.success) {
        if (!toast.isActive("toastCreateProject")) {
          return toast({
            id: "toastCreateProject",
            title: "Error",
            description: "Error in create project",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      if (!toast.isActive("toastCreateProject")) {
        toast({
          id: "toastCreateProject",
          title: "Success",
          description: "Project create successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      setErrors({});
      handleClose();
    }
  };

  const handleSubmitProductProject = async () => {
    setShowErrors(true);
    const newErrors = validateCompletedEditInputsProject(formData);
    if (
      Object.values(newErrors).length > 0 ||
      Object.values(errors).length > 0
    ) {
      setErrors(newErrors);
      return;
    } else {
      const newProject = await dispatch(
        postCustomerProject(CustomerID, formData)
      );
      if (ProdNameID !== undefined) {
        await dispatch(
          postFavoritesProductInProject(newProject?.data?.insertId, ProdNameID)
        );
        if (!newProject.success) {
          if (!toast.isActive("toastCreateProject")) {
            return toast({
              id: "toastCreateProject",
              title: "Error",
              description: "Error in create project",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          if (!toast.isActive("toastCreateProject")) {
            toast({
              id: "toastCreateProject",
              title: "Success",
              description: "Project create successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }
          setErrors({});
          handleClose();
        }
      }
    }
    dispatch(fetchFavorites(CustomerID));
  };

  const handleClose = () => {
    setFormData({
      ProjectName: "",
      Shipping_State: "",
      Shipping_ZipCode: "",
      Shipping_City: "",
      Shipping_Address: "",
    });
    setChangeInput(false);
    setErrors({});
    onClose();
  };

  return (
    <>
      <Button
        h={"3vh"}
        display={"flex"}
        w={postProductProject ? "full" : ""}
        justifyContent={postProductProject ? "start" : ""}
        alignItems={postProductProject ? "start" : ""}
        variant={"unstyled"}
        fontWeight={"light"}
        fontSize={"0.8rem"}
        textAlign={"end"}
        onClick={onOpen}
        _hover={{
          fontWeight: "semibold"
        }}
      >
        + ADD PROJECT
      </Button>
      <Modal
        size={"xl"}
        isOpen={isOpen}
        onClose={() => handleClose()}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent
          bg={"whitesmoke"}
          border={"1px solid"}
          borderColor={"grey"}
        >
          <ModalHeader
            textAlign={"start"}
            fontSize={"1.2rem"}
            fontWeight={"thin"}
            pt={"5%"}
            pl={"5%"}
          >
            CREATE PROJECT
          </ModalHeader>
          <ModalCloseButton onClick={() => handleClose()} />
          <ModalBody>
            <CreateProjectForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              validateCompletedEditInputsProject={
                validateCompletedEditInputsProject
              }
              setChangeInput={setChangeInput}
              showErrors={showErrors}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="customButton"
              variant={"unstyled"}
              fontSize={"0.9rem"}
              fontWeight={"thin"}
              pb={"1%"}
              pr={"1%"}
              onClick={
                postProductProject
                  ? () => handleSubmitProductProject()
                  : () => handleSubmit()
              }
            >
              SUBMIT
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
