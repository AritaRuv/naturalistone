import {
  Box,
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function PaymentMethodForm({
  showErrors,
  formData,
  handleChangePaymentMethod,
  errors,
  setFormData,
}) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("creditCard");

  const [disabled, setDisabled] = useState(false);

  const handleCheckboxChange = (
    event: any,
    // value: string,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState((prevState) =>
      prevState === event.target.value ? "" : event.target.value
    );
    if (event.target.value === "creditCard") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setFormData({
      ...formData,
      Shipping_Address: {
        ...formData.Shipping_Address,
      },
      Payment_Method: {
        ...formData.Payment_Method,
        Method: event.target.value,
        CreditCardNumber: "",
        ExpirationDateMonth: "",
        ExpirationDateYear: "",
        Cvv: "",
      },
    });
  };

  useEffect(() => {
    if (!disabled) {
      setFormData({
        ...formData,
        Payment_Method: {
          CreditCardNumber: "",
          ExpirationDateMonth: "",
          ExpirationDateYear: "",
          Cvv: "",
        },
      });
    }
  }, [setFormData]);

  return (
    <>
      <Box w={"full"} h={"40px"} pl={"40px"} mt={"5%"}>
        <Text fontWeight={"semibold"}>3. PAYMENT METHOD</Text>
      </Box>
      <VStack
        w={"90%"}
        pl={"60px"}
        display={"flex"}
        alignItems={"start"}
        spacing={2}
      >
        <Box display={"flex"} flexDir={"row"} pt={"20px"}>
          <Checkbox
            size="md"
            colorScheme="teal"
            value={"creditCard"}
            isChecked={selectedPaymentMethod === "creditCard"}
            onChange={(event) =>
              handleCheckboxChange(event, setSelectedPaymentMethod)
            }
          />
          <Text fontWeight={"semibold"} pt={"4px"} pl={"20px"}>
            CREDIT CARD
          </Text>
        </Box>
        <VStack pt={"20px"}>
          <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
            <Input
              w={"full"}
              id={"CreditCardNumber"}
              name={"CreditCardNumber"}
              value={formData.Payment_Method.CreditCardNumber}
              placeholder={"CREDIT CARD NUMBER"}
              disabled={disabled}
              border={"none"}
              onChange={handleChangePaymentMethod}
              _focus={{
                boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
              }}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
                outline: "none",
              }}
            />
            <InputRightElement w={"60px"}>
              <Text fontWeight={"semibold"}></Text>
            </InputRightElement>
            {showErrors && (
              <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                {errors.CreditCardNumber}
              </Text>
            )}
          </InputGroup>
          <Box display={"flex"} flexDirection={"row"}>
            <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
              <Input
                w={"full"}
                placeholder={"EXPIRATION DATE"}
                border={"none"}
                disabled={true}
                _focus={{
                  boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
                }}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0", // Ajusta el radio de las esquinas a cero
                  outline: "none",
                }}
              />
            </InputGroup>
            <InputGroup display={"flex"} flexDirection={"column"} h={"80px"}>
              <InputLeftElement>
                <Text fontWeight={"semibold"}>MM</Text>
              </InputLeftElement>
              <Input
                w={"full"}
                id={"ExpirationDateMonth"}
                name={"ExpirationDateMonth"}
                value={formData.Payment_Method.ExpirationDateMonth}
                placeholder={""}
                disabled={disabled}
                border={"none"}
                onChange={handleChangePaymentMethod}
                _focus={{
                  boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
                }}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0", // Ajusta el radio de las esquinas a cero
                  outline: "none",
                }}
              />
              <InputRightElement w={"60px"}>
                <Text fontWeight={"semibold"}></Text>
              </InputRightElement>
              {showErrors && (
                <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                  {errors.ExpirationDateMonth}
                </Text>
              )}
            </InputGroup>
            <InputGroup display={"flex"} flexDirection={"column"} h={"80px"}>
              <InputLeftElement>
                <Text fontWeight={"semibold"}>YY</Text>
              </InputLeftElement>
              <Input
                w={"full"}
                id={"ExpirationDateYear"}
                name={"ExpirationDateYear"}
                value={formData.Payment_Method.ExpirationDateYear}
                placeholder={""}
                disabled={disabled}
                border={"none"}
                onChange={handleChangePaymentMethod}
                _focus={{
                  boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
                }}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0", // Ajusta el radio de las esquinas a cero
                  outline: "none",
                }}
              />
              <InputRightElement w={"60px"}>
                <Text fontWeight={"semibold"}></Text>
              </InputRightElement>
              {showErrors && (
                <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                  {errors.ExpirationDateYear}
                </Text>
              )}
            </InputGroup>
          </Box>
          <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
            <Input
              w={"full"}
              id={"Cvv"}
              name={"Cvv"}
              value={formData.Payment_Method.Cvv}
              placeholder={"CVV"}
              type={"number"}
              disabled={disabled}
              maxLength={3}
              border={"none"}
              onChange={handleChangePaymentMethod}
              _focus={{
                boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
              }}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0", // Ajusta el radio de las esquinas a cero
                outline: "none",
              }}
            />
            <InputRightElement w={"60px"}>
              <Text fontWeight={"semibold"}></Text>
            </InputRightElement>
            {showErrors && (
              <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                {errors.Cvv}
              </Text>
            )}
          </InputGroup>
        </VStack>
        <Box display={"flex"} flexDir={"row"} pt={"40px"}>
          <Checkbox
            size="md"
            value={"debitCard"}
            colorScheme="teal"
            isChecked={selectedPaymentMethod === "debitCard"}
            onChange={(event) =>
              handleCheckboxChange(event, setSelectedPaymentMethod)
            }
          />
          <Text fontWeight={"semibold"} pt={"4px"} pl={"20px"}>
            PAY WITH DEBIT CARD
          </Text>
        </Box>
        <Box display={"flex"} flexDir={"row"} pt={"20px"}>
          <Checkbox
            size="md"
            value={"paypal"}
            colorScheme="teal"
            isChecked={selectedPaymentMethod === "paypal"}
            onChange={(event) =>
              handleCheckboxChange(event, setSelectedPaymentMethod)
            }
          />
          <Text fontWeight={"semibold"} pt={"4px"} pl={"20px"}>
            CHECKOUT WITH PAYPAL
          </Text>
        </Box>
      </VStack>
      <VStack
        w={"90%"}
        pl={"60px"}
        pt={"60px"}
        display={"flex"}
        alignItems={"start"}
        spacing={2}
      >
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"SubTotal"}
            name={"SubTotal"}
            value={"SUBTOTAL"}
            disabled={true}
            border={"none"}
            onChange={handleChangePaymentMethod}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          <InputRightElement w={"60px"}>
            <Text fontWeight={"semibold"}>$ XXX</Text>
          </InputRightElement>
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.SubTotal}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"Shipping_Total"}
            name={"Shipping_Total"}
            value={"SHIPPING"}
            border={"none"}
            disabled={true}
            onChange={handleChangePaymentMethod}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          <InputRightElement w={"60px"}>
            <Text fontWeight={"semibold"}>$ XXX</Text>
          </InputRightElement>
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.Shipping_Total}
            </Text>
          )}
        </InputGroup>
        <InputGroup
          display={"flex"}
          flexDirection={"column"}
          h={"60px"}
          alignItems={"end"}
        >
          <Input
            w={"60%"}
            id={"Total"}
            name={"Total"}
            value={"TOTAL"}
            border={"none"}
            disabled={true}
            onChange={handleChangePaymentMethod}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          <InputRightElement w={"60px"}>
            <Text fontWeight={"semibold"}>$ XXX</Text>
          </InputRightElement>
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.Total}
            </Text>
          )}
        </InputGroup>
      </VStack>
    </>
  );
}
