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

export function PaymentMethodForm({ showErrors }) {
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
          <Checkbox size="md" colorScheme="teal" />
          <Text fontWeight={"semibold"} pt={"4px"} pl={"20px"}>
            CREDIT CARD
          </Text>
        </Box>
        <VStack pt={"20px"}>
          <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
            <Input
              w={"full"}
              id={"firstName"}
              name={"firstName"}
              // value={formData.firstName}
              placeholder={"CREDIT CARD NUMBER"}
              border={"none"}
              // onChange={handleChange}
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
                {/* {errors.firstName} */}
              </Text>
            )}
          </InputGroup>
          <Box display={"flex"} flexDirection={"row"}>
            <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
              <Input
                w={"full"}
                id={"firstName"}
                name={"firstName"}
                // value={formData.firstName}
                placeholder={"EXPIRATION DATE"}
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
              <InputRightElement w={"60px"}>
                <Text fontWeight={"semibold"}></Text>
              </InputRightElement>
              {showErrors && (
                <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                  {/* {errors.firstName} */}
                </Text>
              )}
            </InputGroup>
            <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
              <InputLeftElement>
                <Text fontWeight={"semibold"}>MM</Text>
              </InputLeftElement>
              <Input
                w={"full"}
                id={"firstName"}
                name={"firstName"}
                // value={formData.firstName}
                placeholder={""}
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
              <InputRightElement w={"60px"}>
                <Text fontWeight={"semibold"}></Text>
              </InputRightElement>
              {showErrors && (
                <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                  {/* {errors.firstName} */}
                </Text>
              )}
            </InputGroup>
            <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
              <InputLeftElement>
                <Text fontWeight={"semibold"}>YY</Text>
              </InputLeftElement>
              <Input
                w={"full"}
                id={"firstName"}
                name={"firstName"}
                // value={formData.firstName}
                placeholder={""}
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
              <InputRightElement w={"60px"}>
                <Text fontWeight={"semibold"}></Text>
              </InputRightElement>
              {showErrors && (
                <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                  {/* {errors.firstName} */}
                </Text>
              )}
            </InputGroup>
          </Box>
          <InputGroup display={"flex"} flexDirection={"column"} h={"60px"}>
            <Input
              w={"full"}
              id={"firstName"}
              name={"firstName"}
              // value={formData.firstName}
              placeholder={"CVV"}
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
            <InputRightElement w={"60px"}>
              <Text fontWeight={"semibold"}></Text>
            </InputRightElement>
            {showErrors && (
              <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
                {/* {errors.firstName} */}
              </Text>
            )}
          </InputGroup>
        </VStack>
        <Box display={"flex"} flexDir={"row"} pt={"40px"}>
          <Checkbox size="md" colorScheme="teal" />
          <Text fontWeight={"semibold"} pt={"4px"} pl={"20px"}>
            PAY WITH DEBIT CARD
          </Text>
        </Box>
        <Box display={"flex"} flexDir={"row"} pt={"20px"}>
          <Checkbox size="md" colorScheme="teal" />
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
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"SUBTOTAL"}
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
          <InputRightElement w={"60px"}>
            <Text fontWeight={"semibold"}>$ XXX</Text>
          </InputRightElement>
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
            placeholder={"SHIPPING"}
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
          <InputRightElement w={"60px"}>
            <Text fontWeight={"semibold"}>$ XXX</Text>
          </InputRightElement>
          {showErrors && (
            <Text color={"red"} mt={"0.5vh"} fontSize={"xs"}>
              {/* {errors.firstName} */}
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
            id={"firstName"}
            name={"firstName"}
            // value={formData.firstName}
            placeholder={"TOTAL"}
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
          <InputRightElement w={"60px"}>
            <Text fontWeight={"semibold"}>$ XXX</Text>
          </InputRightElement>
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
