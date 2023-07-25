"use server";
import { Register, Signin } from "@/store/login/typeLogin";
import axios from "axios";
import { cookies } from "next/headers";
// import { useRouter } from "next/navigation";

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
  const cookieStore = cookies();
  // const router = useRouter();
  try {
    const { data }: any = await axios.post(
      "http://localhost:5000/api/auth/signin",
      body
    );

    cookieStore.set({
      name: "sessionId",
      value: data.results.token,
    });

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  const cookieStore = cookies();
  try {
    const token: any = cookieStore.get("sessionId");
    const response: any = await axios.get(
      "http://localhost:5000/api/auth/userinfo",
      {
        headers: {
          authorization: token.value,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
