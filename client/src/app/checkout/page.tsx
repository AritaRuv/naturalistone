"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import CheckoutCart from "./checkoutCart";
import CheckoutForm from "./checkoutForm";

export default function Checkout() {
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  return (
    <Box display={"flex"} flexDirection={smallerThan740 ? "column" : "row"}>
      <CheckoutForm smallerThan740={smallerThan740} />
      <CheckoutCart smallerThan740={smallerThan740} />
    </Box>
  );
}
