import { Box, Input, InputGroup, Text, VStack } from "@chakra-ui/react";

export function ShippingAddresForm({ showErrors }) {
  return (
    <>
      <Box w={"full"} h={"40px"} pl={"40px"} mt={"2%"}>
        <Text fontWeight={"semibold"}>1. SHIPPING ADDRESS</Text>
      </Box>
      <VStack w={"90%"} pl={"60px"}>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            placeholder={"FIRST NAME"}
            // value={formData.firstName}
            border={"none"}
            // onChange={handleChange}
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
              error aqui
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"LAST NAME"}
            border={"none"}
            // onChange={handleChange}
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
              {/* {errors.firstName} */}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"COMPANY (opcional)"}
            border={"none"}
            // onChange={handleChange}
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
              {/* {errors.firstName} */}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"EMAIL"}
            border={"none"}
            // onChange={handleChange}
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
              {/* {errors.firstName} */}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"ADDRESS"}
            border={"none"}
            // onChange={handleChange}
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
              {/* {errors.firstName} */}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"CITY"}
            border={"none"}
            // onChange={handleChange}
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
              {/* {errors.firstName} */}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"STATE/PROVINCE"}
            border={"none"}
            // onChange={handleChange}
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
              {/* {errors.firstName} */}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"ZIP/POSTAL CODE"}
            border={"none"}
            // onChange={handleChange}
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
              {/* {errors.firstName} */}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
          <Input
            w={"full"}
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"PHONE NUMBER"}
            border={"none"}
            // onChange={handleChange}
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
              {/* {errors.firstName} */}
            </Text>
          )}
        </InputGroup>
      </VStack>
    </>
  );
}
