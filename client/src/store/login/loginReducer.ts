/* eslint-disable indent */
import { LoginAction, LoginActionsType, LoginState } from "./typeLogin";

const initialState: LoginState = {
  user: {
    CustomerID: 0,
    Contact_Name: "",
    Company: "",
    Username: "",
    Customer_LoginID: 0,
    Phone: "",
    State: "",
    Address: "",
    Password: "",
    ZipCode: "",
    Billing_Address: "",
    Billing_State: "",
    City: "",
    Company_Position: "",
  },
};

const loginReducer = (
  state = initialState,
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case LoginActionsType.GET_USER_INFO: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LoginActionsType.UPDATE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
