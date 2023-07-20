import { LoginAction, LoginActionsType, LoginState } from "./typeLogin";

const initialState: LoginState = {
  register: {
    username: "",
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
  }
};

export default loginReducer;
