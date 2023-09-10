import { Box, Button, Divider, Text, useMediaQuery } from "@chakra-ui/react";
import ProductCardCart from "../../components/navBar/cartProducts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart } from "@/store/cart/actionsCart";
import { CartState } from "@/store/cart/typesCart";
import { LoginState } from "@/store/login/typeLogin";
import getStripe from "@/utils/getStripe";
import { createCheckout } from "@/api/apiCheckout";

export default function CheckoutCart() {
  const dispatch = useAppDispatch();

  const { cart, loading, error } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );

  const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(fetchCart(user?.CustomerID));
    }
  }, [cart]);


  const handleClickCheckout = async () => {
    const stripe = await getStripe();
    const response = await createCheckout(user.CustomerID);
    const sisionId: string = response.sessionId;

    //stripe.redirectToCheckout({ sessionId: sisionId });
    setClientSecret(response.intento.client_secret);
    
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        w={smallerThan740 ? "full" : "50%"}
      >
        <Box h={"60%"} overflow={"auto"} minW={"450px"} w={"full"} mt={"2%"}>
          <Box
            w={"98%"}
            h={"50px"}
            pl={"40px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDir={"row"}
          >
            <Text fontWeight={"semibold"}>PRODUCT NAME</Text>
            <Text fontWeight={"semibold"} w={"100px"}>
              SUBTOTAL
            </Text>
          </Box>
          {cart?.map((product) => {
            return (
              <Box key={product.idCartEntry}>
                <Divider borderColor={"gray.700"} my={"2%"} />
                <Box
                  display={"flex"}
                  flexDir={!smallerThan740 ? "row" : "column"}
                  w={"98%"}
                  justifyContent={"space-between"}
                >
                  <ProductCardCart product={product} />
                  {!smallerThan740 ? (
                    <Box
                      w={"95px"}
                      h={"178px"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Text
                        h={"30px"}
                        fontWeight={"semibold"}
                        textAlign={"center"}
                      >
                        $ {product.SalePrice * product.Quantity}
                      </Text>
                    </Box>
                  ) : (
                    <Box
                      w={"94%"}
                      h={"30px"}
                      display={"flex"}
                      justifyContent={"flex-end"}
                    >
                      <Text h={"30px"} fontWeight={"semibold"}>
                        ${product.SalePrice * product.Quantity}
                      </Text>
                    </Box>
                  )}
                </Box>
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
              onClick={handleClickCheckout}
            >
              {" "}
              CHECK OUT{" "}
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
