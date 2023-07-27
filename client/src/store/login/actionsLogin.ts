import {
  getUserInfo,
  postRegister,
  postSignin,
  updateUser,
} from "@/api/apiLogin";
import { Dispatch } from "redux";
import { LoginAction, LoginActionsType, Register, Signin } from "./typeLogin";
import { IFormData } from "@/app/profile/page";

export const userInfo = () => {
  return async (dispatch: Dispatch<LoginAction>) => {
    try {
      const { data } = await getUserInfo();

      console.log("soy data", data);

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

// export const registerUser = (body: Register) => {
//   return async function (dispatch: Dispatch<LoginAction>) {
//     // dispatch({ type: LoginActionsType.POST_REGISTER });

//     try {
//       const response = await postRegister(body);
//       const data = response.data;

//       dispatch({
//         type: LoginActionsType.POST_REGISTER,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error);
//       throw new Error("Error in post_register");
//     }
//   };
// };

// export const signinUser = (body: Signin) => {
//   return async function (dispatch: Dispatch<LoginAction>) {
//     try {
//       const response = await postSignin(body);
//       const data = response.data;
//       dispatch({
//         type: LoginActionsType.POST_SIGNIN,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error);
//       throw new Error("Error in post_signin");
//     }
//   };
// };
