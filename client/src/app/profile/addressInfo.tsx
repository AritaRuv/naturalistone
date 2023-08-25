"use client";
import { Box, useMediaQuery, Text, InputGroup, Input } from "@chakra-ui/react";
import { IShowMenu } from "./page";
import { UpdateCustomer } from "./modalUpdateUser";

const AddressInfo: React.FC<IShowMenu> = ({
  user,
  isSmallThan750,
  formData,
  setFormData,
}) => {
  const [isSmallThan1000] = useMediaQuery("(max-width: 1000px)");

  return (
    <>
      <Box
        pl={isSmallThan750 ? 0 : "5vw"}
        w={isSmallThan750 ? "100vw" : "75vw"}
        mt={isSmallThan750 ? "5vh" : 0}
      >
        <Text
          textTransform={"uppercase"}
          fontSize={"1.9rem"}
        >
          ADDRESS
        </Text>
        <Box
          justifyContent={"flex-start"}
          mt={"5vh"}
          h={"40vh"}
          display={"flex"}
          flexDir={
            isSmallThan1000 ? "column" : isSmallThan750 ? "column" : "row"
          }
        >
          <Box
            mr={"6vw"}
            display={"flex"}
            justifyContent={"flex-start"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
            >
              <Text fontSize={"1rem"}>BILLING ADDRESS</Text>
              {/*ADDRESS AND UNIT NR BOX*/}
              <Box
                mt={"2vh"}
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mr={"3vw"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      ADDRESS
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"14vw"}
                      minW={'180px'}
                      position={"relative"}
                      id={"billingAddress"}
                      name={"billingAddress"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Billing_Address}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Billing Address"}
                      id={"billingAddress"}
                      name={"billingAddress"}
                      value={user?.Billing_Address}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      HOUSE/APT NO 
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"14vw"}
                      minW={'180px'}
                      position={"relative"}
                      id={"billingUnitNumber"}
                      name={"billingUnitNumber"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Billing_UnitNumber}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", 
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Billing House/Apt No."}
                      id={"billingUnitNumber"}
                      name={"billingUnitNumber"}
                      value={user?.Billing_UnitNumber}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
              {/*CITY AND ZIP CODE BOX*/}
              <Box
                mt={"2vh"}
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mr={"3vw"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      CITY
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"14vw"}
                      minW={'180px'}
                      position={"relative"}
                      id={"billingCity"}
                      name={"billingCity"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Billing_City}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Billing City"}
                      id={"billingCity"}
                      name={"billingCity"}
                      value={user?.Billing_City}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                    ZIP CODE
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"14vw"}
                      minW={'180px'}
                      position={"relative"}
                      id={"billingZipCode"}
                      name={"billingZipCode"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Billing_ZipCode}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Billing ZipCode"}
                      id={"billingZipCode"}
                      name={"billingZipCode"}
                      value={user?.Billing_ZipCode}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
              {/*STATE AND OBSERVATIONS */}
              <Box
                mt={"2vh"}
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mr={"3vw"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      STATE
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"14vw"}
                      minW={'180px'}
                      position={"relative"}
                      id={"billingState"}
                      name={"billingState"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.Billing_State}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Billing State"}
                      id={"billingState"}
                      name={"billingState"}
                      value={user?.Billing_State}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      OBSERVATIONS
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"14vw"}
                      minW={'180px'}
                      position={"relative"}
                      id={"addressObservations"}
                      name={"addressObservations"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={user?.AddressObservations}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                    <UpdateCustomer
                      title={"Address Observations"}
                      id={"addressObservations"}
                      name={"addressObservations"}
                      value={user?.AddressObservations}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
          >
            <Text fontSize={"1rem"}>SHIPPING ADDRESS</Text>
            {/*ADDRESS AND HOUSE/APT NO */}
            <Box
              mt={"2vh"}
              display={"flex"}
              flexDirection={isSmallThan750 ? "column" : "row"}
            >
              <Box
                mr={"3vw"}
                display={"flex"}
                flexDirection={"column"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                    ADDRESS
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"14vw"}
                      minW={'180px'}
                    position={"relative"}
                    id={"address"}
                    name={"address"}
                    fontSize={"0.9rem"}
                    isReadOnly={true}
                    value={user?.Address}
                    border={"none"}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0",
                      outline: "none",
                    }}
                  />
                  <UpdateCustomer
                    title={"Address"}
                    id={"address"}
                    name={"address"}
                    value={user?.Address}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </InputGroup>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                    HOUSE/APT NO
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"14vw"}
                      minW={'180px'}
                    position={"relative"}
                    id={"unitNumber"}
                    name={"unitNumber"}
                    fontSize={"0.9rem"}
                    isReadOnly={true}
                    value={user?.UnitNumber}
                    border={"none"}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                  />
                  <UpdateCustomer
                    title={"House/Apt No"}
                    id={"unitNumber"}
                    name={"unitNumber"}
                    value={user?.UnitNumber}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </InputGroup>
              </Box>
            </Box>
            {/*CITY AND ZIPCODE */}
            <Box
              mt={"2vh"}
              display={"flex"}
              flexDirection={isSmallThan750 ? "column" : "row"}
            >
              <Box
                mr={"3vw"}
                display={"flex"}
                flexDirection={"column"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                    CITY
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"14vw"}
                      minW={'180px'}
                    position={"relative"}
                    id={"city"}
                    name={"city"}
                    fontSize={"0.9rem"}
                    isReadOnly={true}
                    value={user?.City}
                    border={"none"}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0",
                      outline: "none",
                    }}
                  />
                  <UpdateCustomer
                    title={"City"}
                    id={"city"}
                    name={"city"}
                    value={user?.City}
                    // handleChange={handleChange}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </InputGroup>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                    ZIP CODE
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"14vw"}
                      minW={'180px'}
                    position={"relative"}
                    id={"zipCode"}
                    name={"zipCode"}
                    fontSize={"0.9rem"}
                    isReadOnly={true}
                    value={user?.ZipCode}
                    border={"none"}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                  />
                  <UpdateCustomer
                    title={"Zip Code"}
                    id={"zipCode"}
                    name={"zipCode"}
                    value={user?.ZipCode}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </InputGroup>
              </Box>
            </Box>
            {/*CITY AND ZIPCODE */}
            <Box
              mt={"2vh"}
              display={"flex"}
              flexDirection={isSmallThan750 ? "column" : "row"}
            >
              <Box
                mr={"3vw"}
                display={"flex"}
                flexDirection={"column"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                    STATE
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"14vw"}
                      minW={'180px'}
                    position={"relative"}
                    id={"state"}
                    name={"state"}
                    fontSize={"0.9rem"}
                    isReadOnly={true}
                    value={user?.State}
                    border={"none"}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0",
                      outline: "none",
                    }}
                  />
                  <UpdateCustomer
                    title={"State"}
                    id={"state"}
                    name={"state"}
                    value={user?.State}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </InputGroup>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                    OBSERVATIONS
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"14vw"}
                      minW={'180px'}
                    position={"relative"}
                    id={"addressObservations"}
                    name={"addressObservations"}
                    fontSize={"0.9rem"}
                    isReadOnly={true}
                    value={user?.AddressObservations}
                    border={"none"}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                  />
                  <UpdateCustomer
                    title={"Observations"}
                    id={"addressObservations"}
                    name={"addressObservations"}
                    value={user?.AddressObservations}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </InputGroup>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddressInfo;
