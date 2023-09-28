"use client";
import { Box, useMediaQuery, Text, InputGroup, Input } from "@chakra-ui/react";
import { IShowMenu } from "@/interfaces/profile";
import { UpdateCustomer } from "./modalUpdateUser";
import { useAppSelector } from "@/store/hooks";
import { AddressState } from "@/store/address/addressTypes";
import AddressList from "@/components/address/AddressList";

const AddressInfo: React.FC<IShowMenu> = ({
  user,
  isSmallThan750,
  formData,
  setFormData,
}) => {
  const [isSmallThan1000] = useMediaQuery("(max-width: 1000px)");
  const { address_by_customer } = useAppSelector(
    (state: { addressReducer: AddressState }) => state.addressReducer
  );
  console.log(address_by_customer);
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
          ADDRESSES
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
          <AddressList selectable={false} handleAddress={() => console.log("ff")} />
        </Box>
      </Box>
    </>
  );
};

export default AddressInfo;
