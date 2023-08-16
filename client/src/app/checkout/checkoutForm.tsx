"use client";
import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { validateInputsFormEmail } from "@/utils/validateForms";
import { Field, Form, Formik } from "formik";
import { ShippingAddresForm } from "./ShippingAddresForm";
import { ShippingMethodForm } from "./ShippingMethodForm";
import { PaymentMethodForm } from "./PaymentMethodForm";

export default function CheckoutForm({ smallerThan740 }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateInputsFormEmail({
        ...formData,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleClick = async () => {
    setShowErrors(true);
    if (Object.keys(errors).length) return;
    setFormData({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
    });
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
        <ShippingAddresForm showErrors={showErrors} />
        <ShippingMethodForm showErrors={showErrors} />
        <PaymentMethodForm showErrors={showErrors} />
        <Center w={"90%"} pt={"60px"} h={"200px"}>
          PLACE ORDER
        </Center>
      </Box>
    </>
  );
}
