"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CartState } from "@/store/cart/typesCart";
import { fetchCart } from "@/store/cart/actionsCart";
import ProductCardCart from "./cartProducts";
import "./_navBar.css";
import Link from "next/link";
import { LoginState } from "@/store/login/typeLogin";

const CartButton: React.FC<{
  icon?: boolean;
  isCartModalOpen?: boolean;
  setIsCartModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  sample: boolean;
}> = ({ icon = true, isCartModalOpen, setIsCartModalOpen, sample }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const inputRef = useRef(cart.length);

  useEffect(() => {
    dispatch(fetchCart(user?.CustomerID));
  }, [user]);

  useEffect(() => {
    if (isCartModalOpen) {
      onOpen();
    }
    if (!isOpen) {
      setIsCartModalOpen && setIsCartModalOpen(false);
    }
  }, [isCartModalOpen, isOpen]);

  return (
    <>
      {icon ? (
        <IconButton
          aria-label="Cart-icon"
          variant="unstyled"
          fontSize="2xl"
          icon={<PiShoppingCartThin />}
          onClick={onOpen}
        />
      ) : (
        ""
      )}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>CART ITEMS</DrawerHeader>
          <DrawerBody>
            <Box h={"85%"} overflow={"auto"}>
              {cart?.map((product, index) => {
                return (
                  <Box key={product.idCartEntry}>
                    <ProductCardCart
                      product={product}
                      inputRef={index === inputRef.current ? inputRef : null}
                      sample={sample}
                    />
                    <Divider borderColor={"gray.300"} />
                  </Box>
                );
              })}
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
              <Text fontWeight={"semibold"}>SUB TOTAL: $XXXX</Text>
              <Link href={"/checkout"}>
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
