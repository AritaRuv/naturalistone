import {
  getUserInfo,
  postSignin,
  updateUser,
  postSignUp
} from "@/api/apiLogin";
import { Dispatch } from "redux";
import { LoginAction, LoginActionsType, SignIn } from "./typeLogin";
import { IFormData } from "@/interfaces/profile";

export const userInfo = () => {
  return async (dispatch: Dispatch<LoginAction>) => {
    try {
      const data = await getUserInfo();
      if(data){
        dispatch({
          type: LoginActionsType.GET_USER_INFO,
          payload: data.data
        });
      }

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


export const postSigninAction = (formData: SignIn) => {
  return async (dispatch: Dispatch<LoginAction>) => {
    dispatch({ type: LoginActionsType.LOGIN_REQUEST });
    try {
      const data = await postSignin(formData);
      dispatch({
        type: LoginActionsType.POST_SIGNIN,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postSignUpAction = (formData: SignIn) => {
  return async (dispatch: Dispatch<LoginAction>) => {
    dispatch({ type: LoginActionsType.LOGIN_REQUEST });
    try {
      const response = await postSignUp(formData);

      dispatch({
        type: LoginActionsType.POST_SIGNUP,
        payload: response.data.token
      });
    } catch (error) {
      console.log(error);
    }
  };
};