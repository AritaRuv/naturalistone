"use client";
import React, { useEffect, useRef} from "react";
import { 
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure, 
  Divider} from "@chakra-ui/react";
import { PiShoppingCartThin } from 'react-icons/pi';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CartState } from "@/store/cart/typesCart";
import { fetchCart } from "@/store/cart/actionsCart";
import ProductCardCart from "./cartProducts";

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
          {
              cart?.map(product => {
                return(
                  <>
                  <ProductCardCart product={product} key={product.idCartEntry}/>
                  <Divider borderColor={'gray.300'}/>
                  </>
                )
              })
            }
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </>
     
    )
  }

    export default CartButton;