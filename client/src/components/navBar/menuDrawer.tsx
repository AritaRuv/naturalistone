"use client";
import { 
  Box, 
  Button, 
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./logo";
import"./_navBar.css";

interface MenuDrawerProps {
  handleHome: () => void;
  smallerThan740: boolean
  }

const MenuDrawer: React.FC<MenuDrawerProps> = ({ handleHome, smallerThan740 }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return(
    <>
      <Box display={"flex"} placeItems={"center"} zIndex={1}>
        <IconButton
          aria-label="Menu-icon"
          variant="unstyled"
          fontSize="3xl"
          icon={<RxHamburgerMenu/>} 
          onClick={onOpen}
        />
      </Box>  
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        size={!smallerThan740 ? "sm" : "xs"}
      >
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton pt={"16px"}/>
          <DrawerHeader>
            <Logo/>
          </DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} flexDir={"column"} h={!smallerThan740 ? "40vh" : "70vh"} justifyContent='space-between' alignItems={"flex-start"}>
              <Divider borderColor="blackAlpha.500"/>
              <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" onClick={handleHome} rightIcon={<ChevronRightIcon />}> HOME </Button>
                
              {
                smallerThan740 &&(
                  <> 
                    <Divider borderColor="blackAlpha.500"/>
                    <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}> PROFILE </Button>
                    <Divider borderColor="blackAlpha.500"/>
                    <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}> FAVORITES </Button>
                  </>
                )}
              <Divider borderColor="blackAlpha.500"/>
              <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}> ABOUT US </Button>
              <Divider borderColor="blackAlpha.500"/>
              <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}> PROJECTS </Button>
              <Divider borderColor="blackAlpha.500"/>
              <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}> PRODUCTS </Button>
              <Divider borderColor="blackAlpha.500"/>
              <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}> SHOWS </Button>
              <Divider borderColor="blackAlpha.500"/>
              <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}> OUR TEAM </Button>
              <Divider borderColor="blackAlpha.500"/>
              <Button pl={"2%"} fontSize="1rem" variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}> CONTACT </Button>
              <Divider borderColor="blackAlpha.500"/>
            </Box>
          </DrawerBody>
          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawer;