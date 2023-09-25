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
  Center,
  Box,
} from "@chakra-ui/react";
import { PiUserCircleThin } from "react-icons/pi";
import "./_navBar.css";
import UserButtonsContainer from "@/app/profile/userButtonsContainer";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/getCookiesToken";

const UserButton: React.FC = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter(); // Get the router instance

  const userNotLogin = () => {
    const token = getToken();
    if (token === undefined) {
      return router.push("/signin");
    } else {
      onOpen();
    }
  };
  const URL =
    "https://naturalistone-images.s3.amazonaws.com/muestra/bernard-hermant-H6lV0I-SZjg-unsplash.jpg";

  return (
    <>
      <IconButton
        aria-label="Cart-icon"
        variant="unstyled"
        fontSize="2xl"
        icon={<PiUserCircleThin />}
        onClick={userNotLogin}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"full"}>
        <DrawerOverlay />
        <DrawerContent h={"100vh"} w={"100vw"}>
          <NextImage style={{objectFit:"cover"}} sizes="(max-width: 100vw)" fill src={URL} alt="img" />
          <Box
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.4)"
          />
          <DrawerCloseButton color={"white"} />
          <DrawerBody display={"flex"} justifyContent={"flex-end"}>
            <Center mr={"16vw"}>
              <UserButtonsContainer site={"navbar"} onClose={onClose} />
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserButton;
