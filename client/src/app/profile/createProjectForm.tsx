import {
  FormControl,
  Input,
  VStack,
  Box,
  Text,
  FormLabel,
} from "@chakra-ui/react";

export default function CreateProjectForm({
  formData,
  setFormData,
  validateCompletedInputsProject,
  errors,
  setErrors,
  setChangeInput,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Actualizas solo la propiedad que cambió en el objeto de formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors(
      validateCompletedInputsProject({
        ...formData,
        [name]: value,
      })
    );
    setChangeInput(true);
  };

  return (
    <form>
      <VStack spacing={4}>
        <Box
          w={"22vw"}
          display={"flex"}
          flexDir={"row"}
          pt={"4vh"}
          justifyContent={"space-between"}
        >
          <FormControl>
            <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
              PROJECT NAME
            </FormLabel>
            <Input
              mb={"0.5vh"}
              variant="unstyled"
              _placeholder={{ fontFamily: "body", fontWeight: "inherit" }}
              fontSize={"0.8rem"}
              borderBottomWidth={"2px"}
              type={"text"}
              name={"ProjectName"}
              value={formData.ProjectName}
              onChange={handleChange}
            />
            {errors.ProjectName && (
              <Text position={"absolute"} color={"web.error"} fontSize={"xs"}>
                {errors.ProjectName}
              </Text>
            )}
          </FormControl>
        </Box>
        <Box
          w={"22vw"}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
        >
          <FormControl>
            <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
              SHIPPING ADDRESS
            </FormLabel>
            <Input
              mb={"0.5vh"}
              variant="unstyled"
              textColor={"web.text"}
              _placeholder={{ fontFamily: "body", fontWeight: "inherit" }}
              fontSize={"0.8rem"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              type={"text"}
              name={"Shipping_Address"}
              value={formData.Shipping_Address}
              onChange={handleChange}
            />
            {errors.Shipping_Address && (
              <Text position={"absolute"} color={"web.error"} fontSize={"xs"}>
                {errors.Shipping_Address}
              </Text>
            )}
          </FormControl>
        </Box>
        <Box
          w={"22vw"}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
        >
          <FormControl>
            <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
              CITY
            </FormLabel>
            <Input
              mb={"0.5vh"}
              variant="unstyled"
              textColor={"web.text"}
              _placeholder={{ fontFamily: "body", fontWeight: "inherit" }}
              fontSize={"0.8rem"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              type={"text"}
              name={"Shipping_City"}
              value={formData.Shipping_City}
              onChange={handleChange}
            />
            {errors.Shipping_City && (
              <Text position={"absolute"} color={"web.error"} fontSize={"xs"}>
                {errors.Shipping_City}
              </Text>
            )}
          </FormControl>
        </Box>
        <Box
          w={"22vw"}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
        >
          <FormControl>
            <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
              STATE
            </FormLabel>
            {/* <AutocompleteState 
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              validate={validateCompletedInputsProject}
              setErrors={setErrors}
              name={'Shipping_State'}
            /> */}
            <Input
              mb={"0.5vh"}
              variant="unstyled"
              textColor={"web.text"}
              _placeholder={{ fontFamily: "body", fontWeight: "inherit" }}
              fontSize={"0.8rem"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              type={"text"}
              name={"Shipping_State"}
              value={formData.Shipping_State}
              onChange={handleChange}
            />
            {errors.Shipping_State && (
              <Text position={"absolute"} color={"web.error"} fontSize={"xs"}>
                {errors.Shipping_State}
              </Text>
            )}
          </FormControl>
        </Box>
        <Box
          w={"22vw"}
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
        >
          <FormControl>
            <FormLabel fontSize={"0.8rem"} fontWeight={"normal"}>
              ZIP CODE
            </FormLabel>
            <Input
              mb={"0.5vh"}
              variant="unstyled"
              textColor={"web.text"}
              _placeholder={{ fontFamily: "body", fontWeight: "inherit" }}
              fontSize={"0.8rem"}
              borderBottomWidth={"2px"}
              borderBottomColor={"web.text2"}
              type={"text"}
              name={"Shipping_ZipCode"}
              value={formData.Shipping_ZipCode}
              onChange={handleChange}
            />
            {errors.Shipping_ZipCode && (
              <Text position={"absolute"} color={"web.error"} fontSize={"xs"}>
                {errors.Shipping_ZipCode}
              </Text>
            )}
          </FormControl>
        </Box>
      </VStack>
    </form>
  );
}
