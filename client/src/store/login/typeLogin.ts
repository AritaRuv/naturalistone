export interface Register {
  fullName?: string | undefined;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  CustomerID: string;
  Contact_Name: string;
  Company: string | null;
  Username: string;
  Customer_LoginID: string;
}

export interface Signin {
  email: string;
  password: string;
  token?: string;
}

export interface LoginState {
  user: User;
}

export enum LoginActionsType {
  POST_SIGNIN = "POST_SIGNIN",
  GET_USER_INFO = "GET_USER_INFO",
}

export interface PostSigninActions {
  type: LoginActionsType.POST_SIGNIN;
  payload: Signin;
}

export interface GetUserInfoActions {
  type: LoginActionsType.GET_USER_INFO;
  payload: User;
}

export type LoginAction = PostSigninActions | GetUserInfoActions;
