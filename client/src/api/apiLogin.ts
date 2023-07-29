import { IFormData } from "@/app/profile/page";
import { Register, Signin, User } from "@/store/login/typeLogin";
import axios from "axios";
import Cookies from "js-cookie";

export const postRegister = async (body: Register) => {
  try {
    const data = await axios.post(
      "http://localhost:5000/api/auth/register",
      body
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const postSignin = async (body: Signin) => {
  try {
    const { data }: any = await axios.post(
      "http://localhost:5000/api/auth/signin",
      body
    );

    Cookies.set("sessionId", data.results.token, { expires: 7});

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const token: any = Cookies.get("sessionId");
    const response: any = await axios.get(
      "http://localhost:5000/api/auth/userinfo",
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (body: IFormData) => {
  try {
    const token: any = Cookies.get("sessionId");

    const response = await axios.patch("http://localhost:5000/api/auth", body, {
      headers: {
        authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
