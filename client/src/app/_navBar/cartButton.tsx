"use client";
import React, { useRef} from "react";
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
import ProductCardCart from "./cartProducts";

export interface ProductCart {
  product_id: number;
  product_name: string
  material: string;
  price: number,
  quantity: number
  }

  const CartButton: React.FC = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const products = [{
      product_id: 1,
      product_name: 'Rimini',
      material:'Terrazzo',
      price: 1223,
      quantity: 32
    },{
      product_id: 3,
      product_name: 'Rimini',
      material:'Terrazzo',
      price: 1223,
      quantity: 32
    },{
      product_id: 2,
      product_name: 'Rimini',
      material:'Terrazzo',
      price: 1223,
      quantity: 32
    }]

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
              products.map(product => {
                return(
                  <>
                  <ProductCardCart product={product} key={product.product_id}/>
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