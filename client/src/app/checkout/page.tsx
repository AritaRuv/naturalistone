"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import CheckoutCart from "./checkoutCart";
import CheckoutForm from "./checkoutForm";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginState } from "@/store/login/typeLogin";
import { userInfo } from "@/store/login/actionsLogin";

export default function Checkout() {
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  useEffect(() => {
    if (user.CustomerID === 0) {
      dispatch(userInfo());
    }
    
  }, [user]);

  return (

    <Box display={"flex"} flexDirection={smallerThan740 ? "column" : "row"}>
      {
        user.CustomerID > 0 && <CheckoutForm/>
      }
    </Box>
  );
}
