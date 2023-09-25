"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserMenu from "./userMenu";
import ProfileInfo from "./profileInfo";
import Projects from "./projects";
import { AppContext } from "../appContext";
import { useAppSelector } from "@/store/hooks";
import { LoginState } from "@/store/login/typeLogin";
import AddressInfo from "./addressInfo";
import Favorites from "./favorites";
import OrderHistoryUser from "./orderHistoryUser";


export default function Profile() {

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  const appContext = useContext(AppContext);
  const [isSmallThan750] = useMediaQuery("(max-width: 750px)");

  const [formData, setFormData] = useState({
    customerId: "",
    fullName: "",
    company: "",
    email: "",
    phone: "",
    state: "",
    address: "",
    unitNumber: "",
    addressObservations: "",
    password: "",
    zipCode: "",
    billingAddress: "",
    billingUnitNumber: "",
    billingState: "",
    billingObservations: "",
    city: "",
    companyPosition: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Box
        px={isSmallThan750 ? "0vw" : "5vw"}
        h={"72.5vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={isSmallThan750 ? "column" : "row"}
      >
        <UserMenu
          isSmallThan750={isSmallThan750}
          user={user}
          setFormData={setFormData}
        />
        <Box display={"flex"}>
          {appContext?.showMenu === "profile" && (
            <>
              <ProfileInfo
                user={user}
                isSmallThan750={isSmallThan750}
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
              />
            </>
          )}
          {appContext?.showMenu === "address" && (
            <>
              <AddressInfo
                user={user}
                formData={formData}
                setFormData={setFormData}
              />
            </>
          )}
          {appContext?.showMenu === "projects" && (
            <>
              <Projects />
            </>
          )}
          {appContext?.showMenu === "favorites" && (
            <>
              <Favorites />
            </>
          )}
          {appContext?.showMenu === "order history" && (
            <>
              <OrderHistoryUser user={user} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
