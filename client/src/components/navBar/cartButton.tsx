"use client";
import React, { useEffect, useRef, useContext, useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import { PiShoppingCartThin } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CartState } from "@/store/cart/typesCart";
import ProductCardCart from "./cartProducts";
import "./_navBar.css";
import Link from "next/link";
import { CartButtonProps } from "@/interfaces/cart";
import { AppContext } from "@/app/appContext";
import { fetchCart } from "@/store/cart/actionsCart";


const CartButton: React.FC<CartButtonProps> = ({
  sample,
}) => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ subTotal, setSubTotal ] = useState(0);

  const { cart } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );

  const inputRef = useRef(cart?.length );
  const appContext = useContext(AppContext);
  const modalOpen = appContext?.isCartModalOpen;
  const setModalOpen = appContext?.setIsCartModalOpen;

  useEffect(() => {
    const subT = typeof cart !== "string" ? cart.reduce((total, item) => {
      return total + (item.SalePrice * item.Quantity);
    }, 0) : 0;
    setSubTotal(subT);
  }
  , [cart]);

  useEffect(() => {
    if (modalOpen) {
      onOpen();
    }
    if (!isOpen) {
      setModalOpen && setModalOpen(false);
    }
  }, [modalOpen, isOpen, cart]);

  return (
    <>
      <IconButton
        aria-label="Cart-icon"
        variant="unstyled"
        fontSize="2xl"
        icon={<PiShoppingCartThin />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>CART ITEMS</DrawerHeader>
          <DrawerBody>
            <Box h={"85%"} overflow={"auto"}>
              {
                typeof cart !== "string" &&
                cart?.map((product, index) => {
                  return (
                    <Box key={product.idCartEntry}>
                      <ProductCardCart
                        product={product}
                        inputRef={
                          index === inputRef.current ? inputRef : null
                        }
                        sample={sample}/>
                      <Divider borderColor={"gray.300"} />
                    </Box>
                  );
                })
              }
            </Box>
            <Box
              w={"100%"}
              h={"15%"}
              p={"5%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexDir={"column"}
            >
              <Text fontWeight={"semibold"}>SUB TOTAL: $
                {
                  subTotal
                }
              </Text>
              <Link href={"/preCheckout"}>
                <Button
                  fontSize="0.9rem"
                  variant="unstyled"
                  className="customButton"
                >
                  {" "}
                  CHECK OUT{" "}
                </Button>
              </Link>
            </Box>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartButton;

