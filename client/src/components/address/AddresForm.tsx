import { validateCompletedInputsCheckout } from "@/utils/validateForms";
import { Box, Input, InputGroup, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Address } from "./AddressInterface";

export function AddresForm() {

  const [formData, setFormData] = useState<Address>({
    Nickname: "",
    AddressId: 0,
    CustomerId: 0,
    Address: "",
    Address2: "",
    City: "",
    State: "",
    ZipCode: ""
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  
  const handleChangeShippingAddress = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // setErrors(
    //   validateCompletedInputsCheckout({
    //     ...formData,
    //     Shipping_Address: {
    //       ...formData.Shipping_Address,
    //       [event.target.name]: event.target.value,
    //     },
    //   })
    // );
  };

  return (
    <>
      <VStack w={"full"}>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Nickname"}
            name={"Nickname"}
            value={formData.Nickname}
            placeholder={"NICKNAME"}
            border={"none"}
            onChange={handleChangeShippingAddress}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.Nickname}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Address"}
            name={"Address"}
            value={formData.Address}
            placeholder={"ADDRESS"}
            border={"none"}
            onChange={handleChangeShippingAddress}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.Address}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Address2"}
            name={"Address2"}
            value={formData.Address2}
            placeholder={"ADDRESS 2"}
            border={"none"}
            onChange={handleChangeShippingAddress}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.Address2}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"City"}
            name={"City"}
            value={formData.City}
            placeholder={"CITY"}
            border={"none"}
            onChange={handleChangeShippingAddress}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.City}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"State"}
            name={"State"}
            value={formData.State}
            placeholder={"STATE/PROVINCE"}
            border={"none"}
            onChange={handleChangeShippingAddress}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.State}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"ZipCode"}
            name={"ZipCode"}
            value={formData.ZipCode}
            placeholder={"ZIP/POSTAL CODE"}
            border={"none"}
            onChange={handleChangeShippingAddress}
            _focus={{
              boxShadow: "0 0.0px 0.0px #f2f2f2 inset, 0 0 0px #f2f2f2",
            }}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0", // Ajusta el radio de las esquinas a cero
              outline: "none",
            }}
          />
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {errors.ZipCode}
            </Text>
          )}
        </InputGroup>
      </VStack>
    </>
  );
}
