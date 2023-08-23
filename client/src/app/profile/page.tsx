"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import UserMenu from "./userMenu";
import ProfileInfo from "./profileInfo";
import Projects from "./projects";
import { AppContext } from "../appContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginState, User } from "@/store/login/typeLogin";
import { userInfo } from "../../store/login/actionsLogin";
import AddressInfo from "./addressInfo";
import Favorites from "./favorites";

export interface IFormData {
  customerId: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  unitNumber: string;
  addressObservations: string;
  password: string;
  zipCode: string;
  billingAddress: string;
  billingUnitNumber: string;
  billingState: string;
  billingObservations: string;
  city: string;
  companyPosition: string;
}

export interface IShowMenu {
  site?: string;
  user?: User;
  isSmallThan750?: boolean;
  formData?: IFormData;
  setFormData?: React.Dispatch<React.SetStateAction<IFormData>>;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface userButton {
  site?: string;
  onClose: () => void;
}
export default function Profile() {
  const appContext = useContext(AppContext);

  const dispatch = useAppDispatch();
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

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  useEffect(() => {
    dispatch(userInfo());
  }, []);

  return (
    <>
      <Box
        px={"5vw"}
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
        </Box>
      </Box>
    </>
  );
}
