"use client";
import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure, 
  Box
} from "@chakra-ui/react";
import { PiUserCircleThin } from "react-icons/pi";
import "./_navBar.css";
import UserBox from "@/app/profile/userBox";
import UserButtonsContainer from "@/app/profile/userButtonsContainer";

const UserButton: React.FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showMenu, setShowMenu] = useState<string>("");

  return(
    <>
      <IconButton
        aria-label="Cart-icon"
        variant="unstyled"
        fontSize="3xl"
        icon={<PiUserCircleThin/>}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={"xs"}
      >
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerBody mx={"1vw"} my={"3vh"} >
            <Box>
              <UserBox/>
              <Box mt={"6vh"}>
                <UserButtonsContainer showMenu={showMenu} setShowMenu={setShowMenu} site={"navbar"} onClose={onClose}/>
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
     
  );
};

export default UserButton;