import { Box, Input, InputGroup, Text, VStack } from "@chakra-ui/react";

export function ShippingAddresForm({
  showErrors,
  formData,
  handleChangeShippingAddress,
  errors,
}) {
  console.log("soy form", formData);
  return (
    <>
      <Box w={"full"} h={"40px"} pl={"40px"} mt={"2%"}>
        <Text fontWeight={"semibold"}>1. SHIPPING ADDRESS</Text>
      </Box>
      <VStack w={"90%"} pl={"60px"}>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"FirstName"}
            name={"FirstName"}
            placeholder={"FIRST NAME"}
            value={formData.Shipping_Address.FirstName}
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
              {errors.FirstName}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"LastName"}
            name={"LastName"}
            value={formData.Shipping_Address.LastName}
            placeholder={"LAST NAME"}
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
              {errors.LastName}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Company"}
            name={"Company"}
            value={formData.Shipping_Address.Company}
            placeholder={"COMPANY (opcional)"}
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
              {errors.Company}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Email"}
            name={"Email"}
            value={formData.Shipping_Address.Email}
            placeholder={"EMAIL"}
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
              {errors.Email}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Shipping_Address"}
            name={"Shipping_Address"}
            value={formData.Shipping_Address.Shipping_Address}
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
              {errors.Shipping_Address}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Shipping_City"}
            name={"Shipping_City"}
            value={formData.Shipping_Address.Shipping_City}
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
              {errors.Shipping_City}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Shipping_State"}
            name={"Shipping_State"}
            value={formData.Shipping_Address.Shipping_State}
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
              {errors.Shipping_State}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Shipping_ZipCode"}
            name={"Shipping_ZipCode"}
            value={formData.Shipping_Address.Shipping_ZipCode}
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
              {errors.Shipping_ZipCode}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Phone"}
            name={"Phone"}
            value={formData.Shipping_Address.Phone}
            placeholder={"PHONE NUMBER"}
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
              {errors.Phone}
            </Text>
          )}
        </InputGroup>
      </VStack>
    </>
  );
}
