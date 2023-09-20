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
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CartState, ProductCart } from "@/store/cart/typesCart";
import { fetchCart } from "@/store/cart/actionsCart";
import ProductCardCart from "./cartProducts";
import "./_navBar.css";
import Link from "next/link";
import { LoginState } from "@/store/login/typeLogin";
import { AppContext } from "@/app/appContext";
import { Product } from "@/store/products/typesProducts";

const CartButton: React.FC<{
  icon?: boolean;
  isCartModalOpen?: boolean;
  setIsCartModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  sample?: boolean;
}> = ({
  icon = true,
  isCartModalOpen,
  setIsCartModalOpen,
  sample,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ subTotal, setSubTotal ] = useState(0);

  const { cart } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const cartProductsJson = typeof window !== "undefined" ? localStorage.getItem("cartProducts") : null;

  const productsStorage: Product[] = cartProductsJson !== null ? JSON.parse(cartProductsJson) : [];

  const [arrayProducts, setArrayProducts] = useState([]);

  const inputRef = useRef(cart.length);
  const inputLocalRef = useRef(productsStorage.length);
  const appContext = useContext(AppContext);

  useEffect(() => {
    if(cart.length === 0){

      dispatch(fetchCart(user?.CustomerID));
      console.log(cart)

      const subT = cart.reduce((total, item) => {
        return total + (item.SalePrice * item.Quantity);
      }, 0);
      setSubTotal(subT);
    }
  }, [user,cart]);

  useEffect(() => {
    if (isCartModalOpen) {
      onOpen();
    }
    if (!isOpen) {
      setIsCartModalOpen && setIsCartModalOpen(false);
    }
  }, [isCartModalOpen, isOpen]);

  useEffect(() => {
    if(productsStorage.length !== arrayProducts.length) {
      if (cartProductsJson !== null) {
        setArrayProducts(JSON.parse(cartProductsJson));
      } else {
        setArrayProducts([]);
      }
    }
  }, [productsStorage, arrayProducts]);

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
              {appContext && appContext.userLog
                ? cart?.map((product, index) => {
                  return (
                    <Box key={product.idCartEntry}>
                      <ProductCardCart
                        product={product}
                        inputRef={index === inputRef.current ? inputRef : null}
                        sample={sample}
                        setArrayProducts={setArrayProducts}
                      />
                      <Divider borderColor={"gray.300"} />
                    </Box>
                  );
                })
                : arrayProducts?.map((product, index) => {
                  return (
                    <Box key={index}>
                      <ProductCardCart
                        product={product}
                        inputRef={index === inputLocalRef.current ? inputLocalRef : null}
                        sample={sample}
                        setArrayProducts={setArrayProducts}
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


