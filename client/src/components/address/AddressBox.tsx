import React from "react";
import {  Card, CardBody,  CardHeader, Heading, Text, VStack } from "@chakra-ui/react";
import {  Spacer } from "@chakra-ui/react";

const AddressBox = (props) => {
  const { address } = props;

  return (
    <>
      <Card key={address.AddressId} h={"210px"} boxShadow={"lg"} bgColor={"blackAlpha.100"}  >
        <CardHeader>
          <Text fontSize='md'>{address.Nickname}</Text>
        </CardHeader>
        <Spacer/>
        <CardBody>
          <VStack  alignItems={"start"}>
            <Text fontSize='xs'>Address: {address.Address} {address.Address2}</Text>
            <Text fontSize='xs'>City: {address.City}</Text>
            <Text fontSize='xs'>State: {address.State}</Text>
            <Text fontSize='xs' >Postal Code: {address.ZipCode}</Text>
          </VStack>
        </CardBody>

      </Card>
    </>
  );
};

export default AddressBox;
