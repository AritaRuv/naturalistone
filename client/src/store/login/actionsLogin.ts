import { postRegister } from "@/api/apiLogin";
import { Dispatch } from "redux";
import { LoginAction, LoginActionsType, Register } from "./typeLogin";

export const registerUser = (body: Register) => {
  return async function (dispatch: Dispatch<LoginAction>) {
    // dispatch({ type: LoginActionsType.POST_REGISTER });

    try {
      const response = await postRegister(body);
      const data = response.data;

      dispatch({
        type: LoginActionsType.POST_REGISTER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error in post_register");
    }
  };
};
