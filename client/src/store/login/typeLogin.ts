export interface Register {
  username: string | undefined;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface Signin {
  email: string;
  password: string;
}

export interface LoginState {
  register: Register;
  signin: Signin;
}

export enum LoginActionsType {
  POST_REGISTER = "POST_REGISTER",
  POST_SIGNIN = "POST_SIGNIN",
}

export interface PostRegisterActions {
  type: LoginActionsType.POST_REGISTER;
  payload: Register;
}

export interface PostSigninActions {
  type: LoginActionsType.POST_SIGNIN;
  payload: Signin;
}

export type LoginAction = PostRegisterActions | PostSigninActions;
