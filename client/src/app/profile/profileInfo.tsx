"use client";
import {
  Avatar,
  Box,
  useMediaQuery,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { IShowMenu } from "./page";
import SideCard from "./sideCard";
import { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import { updateUser } from "@/api/apiLogin";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { UpdateCustomer } from "./modalUpdateUser";

const ProfileInfo: React.FC<IShowMenu> = ({
  setShowMenu,
  showMenu,
  user,
  isSmallThan750,
  formData,
  setFormData,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSmallThan1000] = useMediaQuery("(max-width: 1000px)");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <Box pl={'5vw'}  w={'70vw'}>
      <Text textTransform={'uppercase'} fontSize={'1.5rem'} fontWeight={'thin'}>PROFILE</Text>
        <Box w={'62vw'} mt={'2vh'} display={'flex'} flexDir={'row'} justifyContent={'space-between'}>       
          <Box border={'2px solid'} rounded={'sm'} borderColor={'gray.200'} w={'40vw'} h={'50vh'}>
          </Box>
          <SideCard/>
      </Box>
  </Box>


    </>
  );
};

export default ProfileInfo;
