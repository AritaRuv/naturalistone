import { validateCompletedInputsAddress, validateCompletedInputsCheckout } from "@/utils/validateForms";
import { Box, Button, Input, InputGroup, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Address } from "./AddressInterface";
import { useAppDispatch } from "@/store/hooks";
import { postAddress } from "@/store/address/actionAddress";

export function AddresForm(props) {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { addressData } = props;
  const idAddress = addressData.AddressId;
  const [formData, setFormData] = useState<Address>({
    Nickname: addressData.Nickname.length > 0 ? addressData.Nickname : "",
    AddressId: addressData.AddressId > 0 ? addressData.AddressId : 0,
    CustomerId: addressData.CustomerId > 0 ? addressData.CustomerId : 0,
    Address: addressData.Address.length > 0 ? addressData.Address : "",
    Address2: addressData.Address2.length > 0 ? addressData.Address2 : "",
    City: addressData.City.length > 0 ? addressData.City : "",
    State: addressData.State.length > 0 ? addressData.State : "",
    ZipCode: addressData.ZipCode.length > 0 ? addressData.ZipCode : "",
  });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  
  const handleChangeShippingAddress = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateCompletedInputsAddress({
        ...formData,
        [event.target.name]: event.target.value,
      })
    );
    setShowErrors(true);
  };

  const handleSubmit = async () => {
    //
    setShowErrors(true);
    const newErrors = validateCompletedInputsAddress(formData);
    if (
      Object.values(newErrors).length > 0 ||
      Object.values(errors).length > 0
    ) {
      setErrors(newErrors);
      return;
    } 
    const response = await dispatch(
      postAddress(formData)
    );
    if (response.AddressId < 0) {
      if (!toast.isActive("toastCreateAddress")) {
        return toast({
          id: "toastCreateProject",
          title: "Error",
          description: "Error in create address",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    if (!toast.isActive("toastCreateAddress")) {
      toast({
        id: "toastCreateAddress",
        title: "Success",
        description: "Address created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setErrors({});
    props.onClose();
    
  };





  return (
    <>
      <VStack w={"full"}>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Nickname"}
            name={"Nickname"}
            value={formData.Nickname}
            placeholder={"NICKNAME"}
            border={"none"}
            onChange={handleChangeShippingAddress}
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
              {errors.Nickname}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Address"}
            name={"Address"}
            value={formData.Address}
            placeholder={"ADDRESS"}
            border={"none"}
            onChange={handleChangeShippingAddress}
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
              {errors.Address}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"Address2"}
            name={"Address2"}
            value={formData.Address2}
            placeholder={"ADDRESS 2"}
            border={"none"}
            onChange={handleChangeShippingAddress}
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
              {errors.Address2}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"City"}
            name={"City"}
            value={formData.City}
            placeholder={"CITY"}
            border={"none"}
            onChange={handleChangeShippingAddress}
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
              {errors.City}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"State"}
            name={"State"}
            value={formData.State}
            placeholder={"STATE/PROVINCE"}
            border={"none"}
            onChange={handleChangeShippingAddress}
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
              {errors.State}
            </Text>
          )}
        </InputGroup>
        <InputGroup display={"flex"} flexDirection={"column"} h={"62px"}>
          <Input
            w={"full"}
            id={"ZipCode"}
            name={"ZipCode"}
            value={formData.ZipCode}
            placeholder={"ZIP/POSTAL CODE"}
            border={"none"}
            onChange={handleChangeShippingAddress}
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
              {errors.ZipCode}
            </Text>
          )}
        </InputGroup>
        <InputGroup justifyContent={"center"} display={"flex"} alignItems={"center"} flexDirection={"row"} h={"62px"}>
          <Button
            className="customButton"
            variant={"unstyled"}
            fontSize={"0.9rem"}
            fontWeight={"thin"}
            pb={"1%"}
            pr={"1%"}
            onClick={
              idAddress === 0
                ? () => handleSubmit()
                : () => handleSubmit()
            }
          >
          SUBMIT
          </Button>
          <Button
            className="customButton"
            variant={"unstyled"}
            fontSize={"0.9rem"}
            fontWeight={"thin"}
            pb={"1%"}
            pr={"1%"}>
          CANCEL
          </Button>
        </InputGroup>
      </VStack>
    </>
  );
}
