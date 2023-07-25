import { Box, Button, Divider, Text } from "@chakra-ui/react";
import ProductCardCart from "../_navBar/cartProducts";
import Link from "next/link";
import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart } from "@/store/cart/actionsCart";
import { CartState } from "@/store/cart/typesCart";
  
export default function CheckoutCart() {

    const dispatch = useAppDispatch();
    
    const { cart, loading, error } = useAppSelector((state: { cartReducer: CartState }) => state.cartReducer);
   
    useEffect(()=>{
      dispatch(fetchCart(1938))
    },[])
  
  return (
    <>
      <Box h={'60%'} overflow={'auto'} w={'60%'}>
        <Box w={'100%'} h={'20px'} px={'6%'} pb={'3%'} pt={'6%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDir={'row'}>
          <Text fontWeight={'semibold'}>PRODUCT NAME</Text>
          <Text fontWeight={'semibold'}>SUBTOTAL</Text>
        </Box>
        {
          cart?.map(product => {
            return(
              <Box key={product.idCartEntry}>
              <Divider borderColor={'gray.700'} my={'2%'}/>
              <Box border={'2px solid red'} display={'flex'} flexDir={'row'}>
                <ProductCardCart product={product}/>
                <Box
                  w={"30%"}
                  h={"178px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  >
                  <Text
                    h={"30px"}
                    fontWeight={"semibold"}
                    textAlign={"center"}
                    >
                    SUBTOTAL
                  </Text>
                </Box>
              </Box>
              </Box>
              )})
        }
        </Box>
        <Box w={'100%'} h={'15%'} p={'5%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDir={'column'}>
          <Text fontWeight={'semibold'}>SUB TOTAL: $XXXX</Text>
          <Link href={'/checkout'}>
            <Button fontSize="0.9rem" variant="unstyled"  className="customButton"> CHECK OUT </Button>
          </Link>
        </Box>
      </>
    );
  }