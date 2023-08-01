import {
  getUserInfo,
  updateUser,
} from "@/api/apiLogin";
import { Dispatch } from "redux";
import { LoginAction, LoginActionsType } from "./typeLogin";
import { IFormData } from "@/app/profile/page";

export const userInfo = () => {
  return async (dispatch: Dispatch<LoginAction>) => {
    try {
      const { data } = await getUserInfo();

      dispatch({
        type: LoginActionsType.GET_USER_INFO,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const patchUser = (body: IFormData) => {
  return async function (dispatch: Dispatch<LoginAction>) {
    try {
      const update = await updateUser(body);
      const { data } = await getUserInfo();
      dispatch({
        type: LoginActionsType.GET_USER_INFO,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
