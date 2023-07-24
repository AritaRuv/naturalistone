/* eslint-disable no-useless-escape */
import { Register } from "@/store/login/typeLogin";

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface FormErrorsLogin {
  email?: string;
  password?: string;
}

export const validateCompletedInputs = (formData) => {
  const errors: FormErrors = {};
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexMore5Length = /^.{5,}$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (formData.fullName === "") errors.fullName = "Please enter a full name";
  if (formData.fullName !== "") {
    if (!regexNoNumber.test(formData.fullName)) {
      errors.fullName = "Please enter a valid name";
    }
  }
  if (formData.email === "") errors.email = "Please enter a email";
  if (formData.email !== "") {
    if (!regexEmail.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
  }
  if (formData.password === "") errors.password = "Please enter a password";
  if (formData.password !== "") {
    if (!regexMore5Length.test(formData.password)) {
      errors.password = "Please enter a valid password";
    }
  }
  if (formData.confirmPassword === "")
    errors.confirmPassword = "Please confirm password";
  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "confirmPassword is not equal to password";
  }

  return errors;
};

export const validateCompletedInputsLogin = (formData) => {
  const errors: FormErrorsLogin = {};
  const regexMore5Length = /^.{5,}$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (formData.email === "") errors.email = "Please enter a email";
  if (formData.email !== "") {
    if (!regexEmail.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
  }
  if (formData.password === "") errors.password = "Please enter a password";
  if (formData.password !== "") {
    if (!regexMore5Length.test(formData.password)) {
      errors.password = "Please enter a valid password";
    }
  }

  return errors;
};
