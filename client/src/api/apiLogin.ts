import { Register } from "@/store/login/typeLogin";
import axios from "axios";

export const postRegister = async (body: Register) => {
  try {
    const data = await axios.post(
      "http://localhost:3000/api/auth/register",
      body
    );

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("error in register user");
  }
};
