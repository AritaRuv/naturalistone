import { Box, Button, Divider, Text, useMediaQuery } from "@chakra-ui/react";
import ProductCardCart from "../_navBar/cartProducts";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart } from "@/store/cart/actionsCart";
import { CartState } from "@/store/cart/typesCart";

export default function CheckoutCart({ smallerThan740 }) {
  const dispatch = useAppDispatch();

  const { cart, loading, error } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );

  const [smallerThan1200] = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(fetchCart(1938));
    }
  }, [cart]);

  return (
    <>
      <Box w={!smallerThan740 ? "50%" : "100%"} h={"60%"}>
        <Box h={"full"} overflow={"auto"} w={"full"} mt={"2%"}>
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
