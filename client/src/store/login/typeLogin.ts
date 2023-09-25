export interface SignUp {
  fullName?: string | undefined;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  CustomerID: number;
  Contact_Name: string;
  Company?: string;
  Username: string;
  Customer_LoginID: number;
  Phone?: string;
  Address?: string;
  State?: string;
  Password?: string;
  ZipCode?: string;
  Billing_Address?: string;
  Billing_State?: string;
  City?: string;
  UnitNumber?: string;
  AddressObservations?: string;
  Company_Position?: string;
  Billing_ZipCode?: string;
  Billing_City?: string;
  Billing_UnitNumber?: string;
  Billing_Observations?: string;
}

export interface SignIn {
  email: string;
  password: string;
  token?: string;
}

export interface LoginState {
  user: User;
  token: string
}

export enum LoginActionsType {
  POST_SIGNIN = "POST_SIGNIN",
  POST_SIGNUP = "POST_SIGNUP",
  GET_USER_INFO = "GET_USER_INFO",
  UPDATE_USER = "UPDATE_USER",
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_FAILURE = "LOGIN_FAILURE",
}
export interface LoginRequestActions {
  type: LoginActionsType.LOGIN_REQUEST;
}
export interface LoginFailureActions {
  type: LoginActionsType.LOGIN_FAILURE;
}
export interface PostSigninActions {
  type: LoginActionsType.POST_SIGNIN;
  payload: string;
}
export interface PostSignUpActions {
  type: LoginActionsType.POST_SIGNUP;
  payload: string;
}

export interface GetUserInfoActions {
  type: LoginActionsType.GET_USER_INFO;
  payload: User;
}

export interface UpdateUserInfoActions {
  type: LoginActionsType.UPDATE_USER;
  payload: User;
}

export type LoginAction =
  | PostSigninActions
  | GetUserInfoActions
  | UpdateUserInfoActions
  | LoginRequestActions
  | LoginFailureActions
  | PostSignUpActions;
