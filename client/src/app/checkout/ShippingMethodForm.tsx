import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

export function ShippingMethodForm({
  showErrors,
  formData,
  handleChangeFormData,
  errors,
}) {
  return (
    <>
      <Box w={"full"} h={"40px"} pl={"40px"} mt={"5%"}>
        <Text fontWeight={"semibold"}>2. SHIPPING METHOD</Text>
      </Box>
      <Box w={"90%"} pl={"60px"}>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"Shipping_Method"}
            name={"Shipping_Method"}
            value={formData.Shipping_Method}
            placeholder={"ECONOMY SHIPPING"}
            border={"none"}
            onChange={handleChangeFormData}
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
              {errors.Shipping_Method}
            </Text>
          )}
        </InputGroup>
      </Box>
    </>
  );
}
