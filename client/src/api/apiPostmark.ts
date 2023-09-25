import { EmailNaturali } from "@/interfaces/other";
import axios from "axios";

export async function PostEmailToNaturali(body: EmailNaturali) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/email/sendemailnaturali",
      body
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}
