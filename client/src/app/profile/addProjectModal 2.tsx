import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { useState } from "react";
import { validateCompletedInputsProject } from "../assets/validateForm";
import CreateProjectForm from "./createProjectForm";
import { postCustomerProject } from "@/store/projects/actionsProjects";
import { useAppDispatch } from "@/store/hooks";


export function CreateNewProject({CustomerID}) {

  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changeInput, setChangeInput] = useState(false);
  const [formData, setFormData] = useState({
    ProjectName: "",
    CustomerID: CustomerID,
    Shipping_State: "",
    Shipping_ZipCode: "",
    Shipping_City: "",
    Shipping_Address: ""
  });

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    // setErrors({})
    // let newErrors = validateEmptyInputsProjects(formData)
    // setErrors(newErrors)
    // if(Object.entries(newErrors).length){
    //   if(!toast.isActive(toastId)){
    //     return toast(({
    //       id: toastId,
    //       title: "Error",
    //       description: 'All fields must be completed correctly.',
    //       status: "error",
    //       duration: 5000,
    //       isClosable: true,
    //       }))
    // }}else{
    dispatch(postCustomerProject(CustomerID, formData));
    setErrors({});
    handleClose();
    // } 
  };


  const handleClose = () => {
    setFormData({
      ProjectName: "",
      CustomerID: CustomerID,
      Shipping_State: "",
      Shipping_ZipCode: "",
      Shipping_City: "",
      Shipping_Address: ""
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
        variant={"unstyled"} 
        fontWeight={"light"} 
        fontSize={"0.8rem"}
        textAlign={"end"}
        onClick={onOpen}
      >+ ADD PROJECT</Button>
      <Modal size={"xl"} isOpen={isOpen} onClose={()=>handleClose()} motionPreset='slideInRight'>
        <ModalOverlay/>
        <ModalContent
          bg={"whitesmoke"}
          border={"1px solid"}
          borderColor={"grey"}>
          <ModalHeader textAlign={"start"} fontSize={"1.2rem"} fontWeight={"thin"} pt={"5%"} pl={"5%"}>CREATE PROJECT</ModalHeader>
          <ModalCloseButton onClick={()=>handleClose()} />
          <ModalBody >
            <CreateProjectForm formData={formData} setFormData={setFormData} errors={errors}
              setErrors={setErrors} validateCompletedInputsProject={validateCompletedInputsProject} setChangeInput={setChangeInput}/>
          </ModalBody>
          <ModalFooter>
            <Button className="customButton" variant={"unstyled"}fontSize={"0.9rem"} fontWeight={"thin"} pb={"1%"} pr={"1%"} onClick={()=>handleSubmit()}>
                SUBMIT
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}