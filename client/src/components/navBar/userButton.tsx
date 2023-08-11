"use client";
import React from "react";
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure, 
  Center
} from "@chakra-ui/react";
import { PiUserCircleThin } from "react-icons/pi";
import "./_navBar.css";
import UserButtonsContainer from "@/app/profile/userButtonsContainer";
import NextImage from "next/image";


const UserButton: React.FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const URL = "https://naturalistone-images.s3.amazonaws.com/muestra/bernard-hermant-H6lV0I-SZjg-unsplash.jpg";

  return(
    <>
      <IconButton
        aria-label="Cart-icon"
        variant="unstyled"
        fontSize="2xl"
        icon={<PiUserCircleThin/>}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={"full"}
      >
        <DrawerOverlay/>
        <DrawerContent
          h={"100vh"}
          w={"100vw"} 
        >
          <NextImage objectFit="cover" fill src={URL} alt="img" />
          <DrawerCloseButton color={"white"}/>
          <DrawerBody display={"flex"} justifyContent={"flex-end"} >
            <Center mr={"16vw"}>
              <UserButtonsContainer site={"navbar"} onClose={onClose}/>
            </Center>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
     
  );
};

export default UserButton;