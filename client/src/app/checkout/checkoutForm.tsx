"use client";
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  validateCompletedInputsCheckout,
  validateInputsFormEmail,
} from "@/utils/validateForms";
import { Field, Form, Formik } from "formik";
import { ShippingAddresForm } from "./ShippingAddresForm";
import { ShippingMethodForm } from "./ShippingMethodForm";
import { PaymentMethodForm } from "./PaymentMethodForm";
import { CheckoutFormData } from "../../utils/types";

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

  const handleChangePaymentMethod = (event) => {
    if (event.target.name === "Cvv" && event.target.value.length > 3) {
      return;
    }
    setFormData({
      ...formData,
      Payment_Method: {
        ...formData.Payment_Method,
        [event.target.name]: event.target.value,
      },
    });

    setErrors(
      validateCompletedInputsCheckout({
        ...formData,
        Payment_Method: {
          ...formData.Payment_Method,
          [event.target.name]: event.target.value,
        },
      })
    );
  };

  const handleClick = async () => {
    setShowErrors(true);
    if (Object.keys(errors).length) return;
    setFormData({
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
  };

  console.log("formdad", formData);

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
        <PaymentMethodForm
          showErrors={showErrors}
          formData={formData}
          handleChangePaymentMethod={handleChangePaymentMethod}
          errors={errors}
          setFormData={setFormData}
        />
        <Center w={"90%"} pt={"60px"} h={"200px"}>
          <Button
            onClick={handleClick}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
          >
            PLACE ORDER
          </Button>
        </Center>
      </Box>
    </>
  );
}
