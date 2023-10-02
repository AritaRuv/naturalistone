import React,{useState} from "react";
import AddressBox from "./AddressBox";
import {Box, LinkBox, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import AddressBoxNew from "./AddressBoxNew";
import { useAppSelector } from "@/store/hooks";
import { AddressState } from "@/store/address/addressTypes";

interface SelectorAddressProps {
  handleAddress: (value: number) => void;
  selectable: boolean
}

const AddressList: React.FC<SelectorAddressProps> = (props) => {
  const {handleAddress} = props;
  const { selectable } = props;

  const [smallerThan740] = useMediaQuery("(max-width: 740px)");

  const [selected,setSelected] = useState(0);
  const { address_by_customer } = useAppSelector(
    (state: { addressReducer: AddressState }) => state.addressReducer
  );

  const handleClickAddress = (value) => {
    //
    if(selectable){
      setSelected(value);
      handleAddress(value);
    }
  };
  

  return(
    <>
      <SimpleGrid bg={"gray.50"} overflowY="auto" w={"full"}  marginX={"20px"} columns={smallerThan740 ? 1: 4} spacing={10} my={"10px"} p={"1"}>
        <LinkBox key={0} onClick={() => handleAddress(0)}>
          <AddressBoxNew />
        </LinkBox>
        {
          typeof address_by_customer != "string" ? (<>
            {
              address_by_customer?.map((ads) => (
                <Box h="fit-content" border={"2px"} rounded={4} borderColor={selectable && selected === ads.AddressId ? "orange.300" : "gray.600"}>
                  <LinkBox key={ads.AddressId} onClick={() => handleClickAddress(ads.AddressId)}>
                    <AddressBox address={ads} />
                  </LinkBox>
                </Box>
              ))
            }

          </>):(
            <>
            </>
          )

        }
       

      </SimpleGrid>

    </>
  );
};

export default AddressList;