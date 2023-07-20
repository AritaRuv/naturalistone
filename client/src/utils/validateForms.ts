import { Register } from "@/store/login/typeLogin";

export interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
}

export const validateCompletedInputs = (formData: Register) => {
  const errors: FormErrors = {};
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexMore5Length = /^.{5,}$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (formData.username !== "") {
    if (!regexNoNumber.test(formData.username)) {
      errors.username = "Please enter a valid name";
    }
  }
  if (formData.password !== "") {
    if (!regexMore5Length.test(formData.username)) {
      errors.password = "Please enter a valid password";
    }
  }
  if (formData.email !== "") {
    if (!regexEmail.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
  }

  return errors;
};
