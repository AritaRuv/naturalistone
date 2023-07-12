"use client";
import React, { useEffect, useRef} from "react";
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
  Button} from "@chakra-ui/react";
import { PiShoppingCartThin } from 'react-icons/pi';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CartState } from "@/store/cart/typesCart";
import { fetchCart } from "@/store/cart/actionsCart";
import ProductCardCart from "./cartProducts";
import './_navBar.css'

  const CartButton: React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { cart, loading, error } = useAppSelector((state: { cartReducer: CartState }) => state.cartReducer);
    const dispatch = useAppDispatch();

    useEffect(()=>{
      dispatch(fetchCart(1938))
    },[])
    console.log(cart)

    return(
      <>
       <IconButton
        aria-label="Cart-icon"
        variant="unstyled"
        fontSize="3xl"
        icon={<PiShoppingCartThin/>}
        onClick={onOpen}
        />
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size={'md'}
        >
       <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>CART ITEMS</DrawerHeader>
          <DrawerBody >
            <Box h={'85%'} overflow={'auto'}>
              {
                cart?.map(product => {
                  return(
                    <>
                    <ProductCardCart product={product} key={product.idCartEntry}/>
                    <Divider borderColor={'gray.300'}/>
                    </>
                    )})
              }
            </Box>
            <Box w={'100%'} h={'15%'} p={'5%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDir={'column'}>
              <Text fontWeight={'semibold'}>SUB TOTAL: $XXXX</Text>
              <Button fontSize="0.9rem" variant="unstyled" className="customButton"> CHECK OUT </Button>
            </Box>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </>
     
    )
  }

    export default CartButton;