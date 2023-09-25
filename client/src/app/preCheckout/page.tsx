"use client";

import { PiCaretDownThin } from "react-icons/pi";
import { Box, Button, HStack, Link, Select, Text } from "@chakra-ui/react";
import { ProjectsState } from "@/store/projects/typeProjects";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import PreCheckoutCart from "./PreCheckoutCart";
import { fetchCart, updateCart } from "@/store/cart/actionsCart";
import { CartState } from "@/store/cart/typesCart"; 
import { bodyCartUpdate } from "@/interfaces/cart";
import Cookies from "js-cookie";

export default function preCheckout() {

  const customerProjects = useAppSelector(
    (state: { projectsReducer: ProjectsState }) =>
      state.projectsReducer.customerProjects);
  const { cart } = useAppSelector(
    (state: { cartReducer: CartState }) => state.cartReducer
  );

  const dispatch = useAppDispatch();
  const [addMore, setAddMore] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const handleProjectChange = (event) => {
    console.log(event.target.value);
    if(event.target.value){
      setProjectId(event.target.value);
      localStorage.setItem("projectId", event.target.value.toString());
      Cookies.set("projectId", event.target.value.toString());

    }
  };
  console.log(customerProjects);
  useEffect(() => {
    if(customerProjects.length > 0 && typeof customerProjects !== "string" ){
      setProjectId(customerProjects[0].idProjects);
      Cookies.set("projectId", customerProjects[0].idProjects.toString());
    }
  }, [customerProjects]);

  useEffect(() => {
    const added = typeof cart !== "string" ? cart.filter((d) => {return d.AddExtra != 1;}) : [];
    if (added.length === 0) setAddMore(true);
    else setAddMore(false);

    if (cart.length === 0) {
      dispatch(fetchCart());
      const subT = 0;
      setSubTotal(subT);
    }
    const subT = typeof cart !== "string" ? cart.reduce((total, item) => {
      return total + (item.SalePrice * item.Quantity);
    }, 0): 0;
    const tot = Math.round((subT + Number.EPSILON) * 100) / 100;
    setSubTotal(Number(tot.toFixed(2)));
   
  }, [cart]);


  const handleChangeAddMoreAll = (event) =>{
    setAddMore(!addMore);
    const boolCheked = event.target.checked;
    console.log(boolCheked);
    if (boolCheked && typeof cart !== "string"){
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
          dispatch(fetchCart()); 
        }

      }
    }
    else{
      if(typeof cart !== "string"){
        for(let index = 0; index < cart.length; index++) {
          const element = cart[index];
          if (element.AddExtra != 0 ) {
  
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
            dispatch(fetchCart()); 
          }
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
            onChange={handleProjectChange}>
            {
              typeof customerProjects !== "string" && customerProjects?.map((x, y) =>
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
        <Checkbox defaultChecked isChecked={addMore} onChange={handleChangeAddMoreAll}>Add 10% more to cover cuts and waste (recommended)</Checkbox>
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


