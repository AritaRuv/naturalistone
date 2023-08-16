/* eslint-disable no-useless-escape */
import { EmailNaturali, ErrorsProject } from "./types";
import { useEffect } from "react";

export interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  zipCode?: string;
  billingZipCode?: string;
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

export const validateInputsFormEmail = (formData) => {
  const errors: EmailNaturali = {};
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (formData.firstName === "") errors.firstName = "Please enter a first name";
  if (formData.firstName !== "") {
    if (!regexNoNumber.test(formData.firstName)) {
      errors.firstName = "Please enter a valid name";
    }
  }
  if (formData.lastName === "") errors.lastName = "Please enter a last name";
  if (formData.lastName !== "") {
    if (!regexNoNumber.test(formData.lastName)) {
      errors.lastName = "Please enter a valid name";
    }
  }
  if (formData.email === "") errors.email = "Please enter a email";
  if (formData.email !== "") {
    if (!regexEmail.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
  }
  if (formData.subject === "") errors.subject = "Please enter a subject";

  if (formData.message === "") errors.message = "Please enter a message";

  return errors;
};

export const validateCompletedInputsProfile = (formData) => {
  const errors: FormErrors = {};
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexMore5Length = /^.{5,}$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regexPhone = /^[+]?\d+$/;
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
      errors.password = "Password must have more than 5 characters";
    }
  }
  if (formData.phone === "") errors.phone = "Please enter a phone";
  if (formData.phone !== "") {
    if (!regexPhone.test(formData.phone)) {
      errors.phone = "Please enter a valid phone";
    }
  }
  if (formData.zipCode === "") errors.zipCode = "Please enter a zipCode";
  if (formData.zipCode !== "") {
    if (!regexPhone.test(formData.zipCode)) {
      errors.zipCode = "Please enter a valid zipCode";
    }
  }
  if (formData.billingZipCode === "")
    errors.billingZipCode = "Please enter a zip code";
  if (formData.billingZipCode !== "") {
    if (!regexPhone.test(formData.billingZipCode)) {
      errors.billingZipCode = "Please enter a valid zip code";
    }
  }

  return errors;
};

export const validateCompletedEditInputsProject = (formData) => {
  const errors: ErrorsProject = {};
  const regexPhone = /^[+]?\d+$/;
  const regexNoNumber = /^[^\d]*$/;

  if (formData.ProjectName === "")
    errors.ProjectName = "Please enter a project name";

  if (formData.Shipping_Address === "")
    errors.Shipping_Address = "Please enter a shipping address";

  if (formData.Shipping_City === "")
    errors.Shipping_City = "Please enter a shipping city";
  if (formData.Shipping_City !== "") {
    if (!regexNoNumber.test(formData.Shipping_City)) {
      errors.Shipping_City = "Please enter a valid city";
    }
  }

  if (formData.Shipping_State === "")
    errors.Shipping_State = "Please enter a shipping state";
  if (formData.Shipping_State !== "") {
    if (!regexNoNumber.test(formData.Shipping_State)) {
      errors.Shipping_State = "Please enter a valid state";
    }
  }

  if (formData.Shipping_ZipCode === "")
    errors.Shipping_ZipCode = "Please enter a shipping zip code";
  if (formData.Shipping_ZipCode !== "") {
    if (!regexPhone.test(formData.Shipping_ZipCode)) {
      errors.Shipping_ZipCode = "Please enter a valid shipping zip code";
    }
  }

  return errors;
};
