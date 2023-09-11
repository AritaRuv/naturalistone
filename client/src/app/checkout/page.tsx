"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import CheckoutCart from "./checkoutCart";
import CheckoutForm from "./checkoutForm";

export default function Checkout() {
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  return (
    <Box display={"flex"} flexDirection={smallerThan740 ? "column" : "row"}>
      <CheckoutForm smallerThan740={smallerThan740} />
      <CheckoutCart />
    </Box>
  );
}
