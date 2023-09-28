"use client";
import { Box, Button, Center, HStack, Heading, SimpleGrid, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Text, VStack, useMediaQuery, useSteps } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { validateCompletedInputsCheckout} from "@/utils/validateForms";
import { ShippingAddresForm } from "./ShippingAddresForm";
import { ShippingMethodForm } from "./ShippingMethodForm";
import { CheckoutFormData } from "../../interfaces/other";
import { createCheckout } from "@/api/apiCheckout";
import {  useAppSelector } from "@/store/hooks";
import { LoginState } from "@/store/login/typeLogin";
import WrapperStripe from "./wrapperStripe";
import AddressList from "@/components/address/AddressList";

export default function CheckoutForm() {

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("Pick Up");
  const [clientSecret, setClientSecret] = useState("");
  const [receipmentType, setReceipmentType] = useState(0);
  const [addressSelected, setAddressSelected] = useState(0);

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const steps = [
    { title: "Receip method", description: "Choose how you want to receive your order" },
    { title: "Address", description: "Select address billiing" },
    { title: "Pay method", description: "Select pay method" },
  ];
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });


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


  interface SelectorTypeDeliveryProps {
    handleTypeDelivery: (value: number) => void;
  }


  const handleTypeDelivery = (value:number) => {
    setReceipmentType(value);
    nextStep();
  }; 
  
  const handleAddress = (value: number) => {
    setAddressSelected(() => value );
    //nextStep();
  };


  const SelectorTypeDelivery: React.FC<SelectorTypeDeliveryProps> = ({ handleTypeDelivery}) => {

    const types = [
      { title: "Pick Up", description: "You can pick up your products in the physical store",value:1,enabled: true },
      { title: "Delivery", description: "Averiguamos cuanto sale el envio y coordinamos bro", value: 2, enabled: false },
    ];

    return(
      <SimpleGrid marginX={"200px"} columns={smallerThan740 ? 1 : 2} spacing={10}>
        {
          types.map((type) => (
            <Button key={type.value} isDisabled={!type.enabled} onClick={() => handleTypeDelivery(type.value)}>
              <Box key={type.value} height="80px" alignContent={"center"} alignItems={"center"}>
                <Heading as="h3" size="lg">{type.title}</Heading>
                <Text>{type.description}</Text>
              </Box>
            </Button>
          ))}
       
      </SimpleGrid>
    );
  };

  function backStep(){
    setActiveStep(activeStep -1);
  }

  function nextStep() {
    setActiveStep(activeStep + 1);
  }

  return (
    <>
      <VStack mt={"100px"} w={"full"} > 
        <Stepper index={activeStep} w={"70%"}>
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                {
                  !smallerThan740 && <StepDescription>{step.description}</StepDescription>
                }
              
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Box m={"30px"} marginX={"30px"} w={"full"} alignContent={"center"} alignItems={"center"}>
          {
            activeStep === 0 && <SelectorTypeDelivery handleTypeDelivery={handleTypeDelivery}/>
          }
          {
            activeStep === 1 && <Center>  <Box w={"70%"}><AddressList handleAddress={handleAddress} selectable={true} /> </Box></Center>
          }
          {
            activeStep === 2 && clientSecret ? 
              (<WrapperStripe clientSecret={clientSecret} 
                errors={errors} 
                setShowErrors={setShowErrors}
                receive={receipmentType}
                address={addressSelected} />) : (<></>)
          }
        </Box>
        <HStack>
          <Button onClick={backStep} hidden={activeStep === 0} >
            <Text>Back</Text>
          </Button>
          <Button colorScheme="blue" onClick={nextStep} hidden={activeStep === 2}>
            <Text>Next</Text>
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
