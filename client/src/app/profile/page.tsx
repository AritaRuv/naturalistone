"use client";
import { Box, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../_navBar/_navBar";
import { useEffect, useContext, useState } from "react";
import UserMenu from "./userMenu";
import ProfileInfo from "./profileInfo";
import Projects from "./projects";
import { AppContext } from "../appContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginState, User } from "@/store/login/typeLogin";
import { userInfo } from "../../store/login/actionsLogin";
import AddressInfo from "./addressInfo";

export interface IFormData {
  customerId: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  password: string;
  zipCode: string;
  billingAddress: string;
  billingState: string;
  city: string;
  companyPosition: string;
}

export interface IShowMenu {
  // setShowMenu?: React.Dispatch<React.SetStateAction<string>>;
  // showMenu?: string;
  site?: string;
  user?: User;
  isSmallThan750?: boolean;
  formData?: IFormData;
  setFormData?: React.Dispatch<React.SetStateAction<IFormData>>;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Profile() {
  const appContext = useContext(AppContext);

  const [isSmallScreen] = useMediaQuery("(max-width: 1200px)");
  // const [showMenu, setShowMenu] = useState<string>("");
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
    password: "",
    zipCode: "",
    billingAddress: "",
    billingState: "",
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
      <NavBar />
      <Box
        px={"5vw"}
        py={isSmallThan750 ? 0 : "10vh"}
        display={"flex"}
        flexDir={isSmallThan750 ? "column" : "row"}
      >
        <UserMenu
          // setShowMenu={setShowMenu}
          // showMenu={showMenu}
          isSmallThan750={isSmallThan750}
          user={user}
          formData={formData}
          setFormData={setFormData}
        />
        <Box display={"flex"}>
          {appContext?.showMenu === "profile" && (
            <>
              <ProfileInfo
                // setShowMenu={appContext?.setShowMenu}
                // showMenu={appContext?.showMenu}
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
                // setShowMenu={appContext?.setShowMenu}
                // showMenu={appContext?.showMenu}
                user={user}
                formData={formData}
                setFormData={setFormData}
              />
            </>
          )}
          {appContext?.showMenu === "projects" && (
            <>
              <Projects
                // setShowMenu={appContext?.setShowMenu}
                // showMenu={appContext?.showMenu}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
