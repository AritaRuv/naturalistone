import React,{useState} from "react";
import { Address } from "./AddressInterface";
import AddressBox from "./AddressBox";
import {Box, LinkBox, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import AddressBoxNew from "./AddressBoxNew";

interface SelectorAddressProps {
  handleAddress: (value: number) => void;
}

const AddressList: React.FC<SelectorAddressProps> = ({ handleAddress }) => {
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const [selected,setSelected] = useState(0);

  const arrayAddresses: Address[] = [
    {
      Nickname:"Company central",
      AddressId: 1,
      CustomerId: 4033,
      Address: "Falkner 1375",
      Address2: "3 B",
      City: "San Bernardo",
      State: "Buenos Aires",
      PostalCode: "7111",
    },
    {
      Nickname: "Company sucursal 2",
      AddressId: 2,
      CustomerId: 4033,
      Address: "Bragado 6328",
      Address2: " ",
      City: "Wilde",
      State: "Buenos Aires",
      PostalCode: "2453C",
    },
  ];

  const handleClickAddress = (value) => {
    //
    setSelected(value);
    handleAddress(value);
  };
  

  return(
    <>
      <SimpleGrid bgColor={"gray"} marginX={"200px"} columns={smallerThan740 ? 1: 4} spacing={10} my={"10px"} p={"2"}>
        {
          arrayAddresses.map((ads) => (
            <LinkBox  key={ads.AddressId} onClick={() => handleClickAddress(ads.AddressId)}>
              <Box borderRadius={"5px"} p={"2px"} bgColor={selected === ads.AddressId ? "green" : "black"} key={ads.AddressId}>
                <AddressBox address={ads} />
              </Box>
            </LinkBox>
          ))}
        <LinkBox key={0} onClick={() => handleAddress(0)}>
          <AddressBoxNew  />
        </LinkBox>

      </SimpleGrid>

    </>
  );
};

export default AddressList;