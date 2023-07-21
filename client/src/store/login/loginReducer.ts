import { LoginAction, LoginActionsType, LoginState } from "./typeLogin";

const initialState: LoginState = {
  register: {
    username: "",
    email: "",
    password: "",
  },
  signin: {
    email: "",
    password: "",
  },
};

const loginReducer = (
  state = initialState,
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case LoginActionsType.POST_REGISTER: {
      return {
        ...state,
        register: action.payload,
      };
    }
    case LoginActionsType.POST_SIGNIN: {
      return {
        ...state,
        signin: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
