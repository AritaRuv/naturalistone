"use client";

import { PiCaretDownThin } from "react-icons/pi";
import CheckoutCart from "../checkout/checkoutCart";
import { Box, HStack, Select, Text, useMediaQuery } from "@chakra-ui/react";
import { ProjectsState } from "@/store/projects/typeProjects";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { LoginState } from "@/store/login/typeLogin";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { userInfo } from "@/store/login/actionsLogin";
import PreCheckoutCart from "./PreCheckoutCart";

export default function preCheckout() {
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");
  const customerProjects = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer.customerProjects);
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer);

  const dispatch = useAppDispatch();
  const [addMore, setAddMore] = useState(false);

  
  useEffect(() => {
    if (user.CustomerID === 0){
      dispatch(userInfo());
    }
    else{
      dispatch(fetchProjectsCustomer(user.CustomerID));
    }
  }, [user]);
  
  const handleChangeAddMoreAll = () =>{
    setAddMore(!addMore);
  };


  return (
    <>
      <Box w={"100vw"} px={"1vw"} mt={"100px"}>
        <HStack spacing="24px">
          <Text >Project: </Text>
          <Select
            icon={<PiCaretDownThin />}
            variant="outline"
            w={"10vw"}
            minW={"120px"}
            h={"26px"}
            focusBorderColor="none"
            name="projects"
            >
            {
              customerProjects && customerProjects?.map((x, y) =>
                <option key={y}>{x.ProjectName}</option>)
            }

          </Select>
        </HStack>
      </Box>
      <PreCheckoutCart smallerThan740={smallerThan740} />
      <Box
        w={"100%"}
        h={"15%"}
        p={"5%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={"column"}
      >
      <Checkbox defaultChecked 
        isChecked={addMore}
        onChange={handleChangeAddMoreAll}>Add 10% more to cover cuts and waste (recommended)</Checkbox>
      </Box>
    </>
  );
}


