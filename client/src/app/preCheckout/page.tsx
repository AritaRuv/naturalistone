"use client";

import { PiCaretDownThin } from "react-icons/pi";
import CheckoutCart from "../checkout/checkoutCart";
import { Box, Button, HStack, Link, Select, Text, useMediaQuery } from "@chakra-ui/react";
import { ProjectsState } from "@/store/projects/typeProjects";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { fetchProjectsCustomer } from "@/store/projects/actionsProjects";
import { LoginState } from "@/store/login/typeLogin";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { userInfo } from "@/store/login/actionsLogin";
import PreCheckoutCart from "./PreCheckoutCart";
import { bodyCartUpdate, fetchCart, updateCart } from "@/store/cart/actionsCart";
import { CartState } from "@/store/cart/typesCart";
import Cookies from "js-cookie";

export default function preCheckout() {
  const [smallerThan740] = useMediaQuery("(max-width: 740px)");
  const customerProjects = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer.customerProjects);
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer);

  const dispatch = useAppDispatch();
  const [addMore, setAddMore] = useState(false);
  const [projectId, setProjectId] = useState(0);


  const { cart } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );

  const [subTotal, setSubTotal] = useState(0);

  const handleProjectChange = (event) => {
    console.log(event.target.value);
    if(event.target.value){
      setProjectId(event.target.value);
      localStorage.setItem("projectId", event.target.value.toString());
      Cookies.set("projectId", event.target.value.toString());

    }
  };

  useEffect(() => {
    if (user.CustomerID === 0){
      dispatch(userInfo());
    }
    if (customerProjects.length === 0 && user.CustomerID != 0){
      dispatch(fetchProjectsCustomer(user.CustomerID));
    }
    if(customerProjects.length > 0){
      setProjectId(customerProjects[0].idProjects);
      Cookies.set("projectId", customerProjects[0].idProjects.toString());

    }
    

  }, [user, customerProjects]);

  useEffect(() => {
    const added = cart.filter((d) => {return d.AddExtra != 1;});
    if (added.length === 0)
      setAddMore(true);
    else
      setAddMore(false);
    if (cart.length === 0) {
      dispatch(fetchCart(user.CustomerID));
      const subT = 0;
      setSubTotal(subT);
    }
    const subT = cart.reduce((total, item) => {
      return total + (item.SalePrice * item.Quantity);
    }, 0);
    setSubTotal(Math.round((subT + Number.EPSILON) * 100) / 100);
   
  }, [cart]);


  const handleChangeAddMoreAll = (event) =>{
    setAddMore(!addMore);
    const boolCheked = event.target.checked;
    console.log(boolCheked)
    if (boolCheked){
      for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        if(element.AddExtra === 0){
          const porcentaje = Math.round((10 * (element.Quantity / 100)));
          const newQuantity = element.Quantity + porcentaje;
          const bodyUpd: bodyCartUpdate= {
            Quantity: newQuantity,
            idCartEntry: element.idCartEntry,
            customerID: element.CustomerID,
            AddExtra: 1,
            ToInvoice: element.ToInvoice
          };
          dispatch(updateCart(bodyUpd));      
          dispatch(fetchCart(user.CustomerID)); 
        }

      }
    }
    else{
      for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        if (element.AddExtra != 0) {

          let porcientoTotal = 110;
          let quanti = element.Quantity;

          porcientoTotal = porcientoTotal / 110;
          quanti = quanti / 110;
          porcientoTotal = porcientoTotal * 100;
          quanti = quanti * 100;
          console.log(quanti);
          const bodyUpd: bodyCartUpdate = {
            Quantity: quanti,
            idCartEntry: element.idCartEntry,
            customerID: element.CustomerID,
            AddExtra: 0,
            ToInvoice: element.ToInvoice
          };
          dispatch(updateCart(bodyUpd));     
          dispatch(fetchCart(user.CustomerID)); 
        }
      }
    }
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
            onChange={handleProjectChange}
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
        w={"50%"}
        h={"15%"}
        p={"1%"}
        display={"flex"}
        flexDir={"column"}
      >
      <Checkbox defaultChecked 
        isChecked={addMore}
        onChange={handleChangeAddMoreAll}>Add 10% more to cover cuts and waste (recommended)</Checkbox>
      </Box>
      <Box
        w={"50%"}
        h={"15%"}
        pt={"1%"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"end"}
      >
        <Text fontWeight={"semibold"} fontSize={"2xl"}>SUB TOTAL: $
          {
            subTotal
          }
        </Text>
        <Link href={"/checkout"}>
          <Button
            fontSize="0.9rem"
            variant="unstyled"
            className="customButton"
          >
            {" "}
            CHECK OUT{" "}
          </Button>
        </Link>
      </Box>
        
    </>
  );
}


