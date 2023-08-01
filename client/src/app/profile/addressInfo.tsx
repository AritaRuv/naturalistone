"use client";
import {
  Box,
  useMediaQuery,
  Text,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { IShowMenu } from "./page";
import { UpdateCustomer } from "./modalUpdateUser";

const AddressInfo: React.FC<IShowMenu> = ({
  user,
  isSmallThan750,
  formData,
  setFormData,
  handleChange,
}) => {
  const [isSmallThan1000] = useMediaQuery("(max-width: 1000px)");

  return (
    <>
      <Box
        pl={isSmallThan750 ? 0 : "5vw"}
        w={isSmallThan750 ? "100vw" : "75vw"}
        ml={isSmallThan750 ? 0 : "5vw"}
        mt={isSmallThan750 ? "5vh" : 0}
        h={"80vh"}
      >
        <Text
          textTransform={"uppercase"}
          fontSize={"1.9rem"}
          ml={"1vw"}
        >
          ADDRESS
        </Text>
        <Box
          justifyContent={"flex-start"}
          w={"70vw"}
          mt={"2vh"}
          display={"flex"}
          flexDir={
            isSmallThan1000 ? "column" : isSmallThan750 ? "column" : "row"
          }
        >
          <Box
            border={"2px solid"}
            rounded={"sm"}
            borderColor={"gray.200"}
            w={isSmallThan750 ? "100vw" : "48vw"}
            h={"70vh"}
            minW={"400px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            p={"20px"}
          >
            <Box
              display={"flex"}
              h={"95%"}
              w={"95%"}
              flexDirection={"column"}
            >
              <Box>
                <Text fontSize={"md"}>ADDRESS</Text>
              </Box>
              <Box
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"xs"} color={"#646464"}>
                      ADDRESS
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    // bg={"green"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"address"}
                      name={"address"}
                      fontSize={"sm"}
                      value={user?.Address}
                      border={"none"}
                      // onChange={handleChange}
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
                      title={"Address"}
                      id={"address"}
                      name={"address"}
                      value={user?.Address}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"xs"} color={"#646464"}>
                      STATE
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"state"}
                      name={"state"}
                      fontSize={"sm"}
                      value={user?.State}
                      border={"none"}
                      // onChange={handleChange}
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
                      title={"State"}
                      id={"state"}
                      name={"state"}
                      value={user?.State}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                  // bg={"yellow"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"xs"} color={"#646464"}>
                      CITY
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    pl={"10px"}
                    // bg={"green"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"city"}
                      name={"city"}
                      fontSize={"sm"}
                      value={user?.City}
                      border={"none"}
                      // onChange={handleChange}
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
                      title={"City"}
                      id={"city"}
                      name={"city"}
                      value={user?.City}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"xs"} color={"#646464"}>
                      ZIP CODE
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"zipCode"}
                      name={"zipCode"}
                      fontSize={"sm"}
                      value={user?.ZipCode}
                      border={"none"}
                      // onChange={handleChange}
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
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              h={"95%"}
              w={"95%"}
              flexDirection={"column"}
              pt={"20px"}
            >
              <Box>
                <Text fontSize={"md"}>COMPANY ADDRESS</Text>
              </Box>
              <Box
                display={"flex"}
                flexDirection={isSmallThan750 ? "column" : "row"}
              >
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                  // bg={"yellow"}
                >
                  {/* <FormLabel htmlFor="fullName"> */}
                  <Box pl={"10px"}>
                    <Text fontSize={"xs"} color={"#646464"}>
                      BILLING ADDRESS
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    // bg={"green"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"billingAddress"}
                      name={"billingAddress"}
                      fontSize={"sm"}
                      value={user?.Billing_Address}
                      border={"none"}
                      // onChange={handleChange}
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
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  w={"full"}
                  flexDirection={"column"}
                  pt={"20px"}
                >
                  <Box pl={"10px"}>
                    <Text fontSize={"xs"} color={"#646464"}>
                      BILLING STATE
                    </Text>
                  </Box>
                  <InputGroup
                    pt={"5px"}
                    display={"flex"}
                    flexDirection={"column"}
                    h={"60px"}
                    pl={"10px"}
                  >
                    <Input
                      h={"25px"}
                      w={"80%"}
                      position={"relative"}
                      id={"billingState"}
                      name={"billingState"}
                      fontSize={"sm"}
                      value={user?.Billing_State}
                      border={"none"}
                      // onChange={handleChange}
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
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddressInfo;
