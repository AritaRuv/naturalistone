"use client";
import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { validateCompletedInputsCheckout} from "@/utils/validateForms";
import { ShippingAddresForm } from "./ShippingAddresForm";
import { ShippingMethodForm } from "./ShippingMethodForm";
import { CheckoutFormData } from "../../interfaces/other";
import { createCheckout } from "@/api/apiCheckout";
import {  useAppSelector } from "@/store/hooks";
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
    if(user.CustomerID > 0)
    {
      //llamo a la api para que calcule el monto final del carrito y genera el clientSecret para renderizar el componente stripe
      const response = await createCheckout(user.CustomerID);
      setClientSecret(() => (response.intento.client_secret)
      );
    }
  }

  useEffect(() => {
    if(user.CustomerID > 0)
      handleLoadStripe();
  }, [user]);

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
        w={"full"}
        display={"flex"}
        flexDir={"row"}
        minW={"450px"}
        mt={"100px"}
        alignContent={"center"}
        p="10px"
      >
       
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
        <Box w={"full"}>
          {
            clientSecret != "" && <WrapperStripe clientSecret={clientSecret} formData={formData} errors={errors} setShowErrors={setShowErrors} />
          }
        </Box>
      </Box>
    </>
  );
}
