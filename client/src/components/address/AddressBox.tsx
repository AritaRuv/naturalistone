import React from "react";
import {  Card, CardBody,  CardHeader, Heading, Text, VStack } from "@chakra-ui/react";
import {  Spacer } from "@chakra-ui/react";

const AddressBox = (props) => {
  const { address } = props;

  return (
    <>
      <Card key={address.AddressId} h={"210px"} boxShadow={"lg"} bgColor={"blackAlpha.100"}  >
        <CardHeader>
          <Heading size={"md"}> {address.Nickname}</Heading>
        </CardHeader>
        <Spacer/>
        <CardBody>
          <VStack  alignItems={"start"}>
            <Text as="em">Address: {address.Address} {address.Address2}</Text>
            <Text as="em">City: {address.City}</Text>
            <Text as="em">State: {address.State}</Text>
            <Text as="em">Postal Code: {address.ZipCode}</Text>
          </VStack>
        </CardBody>

      </Card>
    </>
  );
};

export default AddressBox;
