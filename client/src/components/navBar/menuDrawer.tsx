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
  const buttons = [
    {name: "home"},
    {name: "profile"},
    {name: "about us"},
    {name: "showroom"},
    {name: "our team"},
    {name: "contact"},
  ];

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
        placement={"left"}
        onClose={onClose}
        size={smallerThan740 ? "full" : "md"}
      >
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton/>
          <DrawerHeader ml={"10px"}>
            <Logo/>
          </DrawerHeader>
          <DrawerBody mt={"30px"}>
            {
              buttons.map(button => {
                return(
                  <> 
                    <Box p={"10px"}>
                      <Button textTransform={"uppercase"} pl={"2%"} fontSize={"sizes.menuButton"} variant="unstyled" className="menuDrawerButton" rightIcon={<ChevronRightIcon />}>{button.name}</Button>
                      <Divider borderColor="gray.100"/>
                    </Box>
                  </>
                );
              })

            }
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