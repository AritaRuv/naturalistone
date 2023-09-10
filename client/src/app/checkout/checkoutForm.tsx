"use client";
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  validateCompletedInputsCheckout,
  validateInputsFormEmail,
} from "@/utils/validateForms";
import { ShippingAddresForm } from "./ShippingAddresForm";
import { ShippingMethodForm } from "./ShippingMethodForm";
import { CheckoutFormData } from "../../utils/types";
import { createCheckout } from "@/api/apiCheckout";
import { useAppSelector } from "@/store/hooks";
import { LoginState } from "@/store/login/typeLogin";
import WrapperStripe from "./wrapperStripe";

export default function CheckoutForm({ smallerThan740 }) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    Shipping_Address: {
      FirstName: "",
      LastName: "",
      Company: "",
      Email: "",
      Shipping_Address: "",
      Shipping_City: "",
      Shipping_State: "",
      Shipping_ZipCode: "",
      Phone: "",
    },
    Shipping_Method: "",
    Payment_Method: {
      Method: "creditCard",
      CreditCardNumber: "",
      ExpirationDateMonth: "",
      ExpirationDateYear: "",
      Cvv: "",
    },
    SubTotal: "",
    Shipping_Total: "",
    Total: "",
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  async function handleLoadStripe() {
    //llamo a la api para que calcule el monto final del carrito y genera el clientSecret para renderizar el componente stripe
    const response = await createCheckout(user.CustomerID);
    setClientSecret(() => (
      response.intento.client_secret,
   ));
  }

  useEffect(() => {
    handleLoadStripe();

  }, []);
  console.log(clientSecret)

  const handleChangeFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateCompletedInputsCheckout({
        ...formData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleChangeShippingAddress = (event) => {
    setFormData({
      ...formData,
      Shipping_Address: {
        ...formData.Shipping_Address,
        [event.target.name]: event.target.value,
      },
    });
    setErrors(
      validateCompletedInputsCheckout({
        ...formData,
        Shipping_Address: {
          ...formData.Shipping_Address,
          [event.target.name]: event.target.value,
        },
      })
    );
  };

  return (
    <>

      <Box
        h={"full"}
        w={smallerThan740 ? "full" : "50%"}
        display={"flex"}
        flexDir={"column"}
        minW={"450px"}
      >
        <Box w={"full"} h={"40px"} pl={"40px"} mt={"2%"}>
          <Text fontWeight={"semibold"}>SECURE CHECKOUT</Text>
        </Box>
        <ShippingAddresForm
          showErrors={showErrors}
          formData={formData}
          handleChangeShippingAddress={handleChangeShippingAddress}
          errors={errors}
        />
        <ShippingMethodForm
          showErrors={showErrors}
          formData={formData}
          handleChangeFormData={handleChangeFormData}
          errors={errors}
        />
        <Box w={"90%"} pl={"60px"}>
          {
            clientSecret != "" && <WrapperStripe clientSecret={clientSecret} formData={formData} errors={errors} setShowErrors={setShowErrors} />
          }

        </Box>
        {/* <PaymentMethodForm
          showErrors={showErrors}
          formData={formData}
          handleChangePaymentMethod={handleChangePaymentMethod}
          errors={errors}
          setFormData={setFormData}
        /> */}



        {/* <Center w={"90%"} pt={"60px"} h={"200px"}>
          <Button
            onClick={handleClick}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
          >
            PLACE ORDER
          </Button>
        </Center> */}
      </Box>
    </>
  );
}
