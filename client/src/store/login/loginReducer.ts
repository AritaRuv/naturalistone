import { LoginAction, LoginActionsType, LoginState } from "./typeLogin";

const initialState: LoginState = {
  user: {
    CustomerID: "",
    Contact_Name: "",
    Company: "",
    Username: "",
    Customer_LoginID: "",
    Phone: "",
    State: "",
    Address: "",
    Password: "",
    ZipCode: "",
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
    default: {
      return state;
    }
  }
};

export default loginReducer;
