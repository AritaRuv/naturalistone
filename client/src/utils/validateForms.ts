/* eslint-disable no-useless-escape */
import { EmailNaturali, ErrorsProject } from "../interfaces/other";
import { FormErrorsLogin, FormErrors } from "@/interfaces/login";



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
  const regexPhone = /^[0-9+\s()-]+$/;

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

export const validateCompletedInputsCheckout = (formData) => {
  const errors: any = {};
  const regexNumber = /^[+]?\d+$/;
  const regexPhone = /^[0-9+\s()-]+$/;
  const regexNoNumber = /^[^\d]*$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regexOnlyLetters = /^[a-zA-Z\s]+$/;
  const regexCard = /^[0-9\s]+$/;

  if (formData.Shipping_Address.FirstName === "")
    errors.FirstName = "Please enter a first name";
  if (formData.Shipping_Address.FirstName !== "") {
    if (!regexOnlyLetters.test(formData.Shipping_Address.FirstName)) {
      errors.FirstName = "Please enter a valid name";
    }
  }

  if (formData.Shipping_Address.LastName === "")
    errors.LastName = "Please enter a last name";
  if (formData.Shipping_Address.LastName !== "") {
    if (!regexOnlyLetters.test(formData.Shipping_Address.LastName)) {
      errors.LastName = "Please enter a valid name";
    }
  }

  if (formData.Shipping_Address.Email === "")
    errors.Email = "Please enter a email";
  if (formData.Shipping_Address.Email !== "") {
    if (!regexEmail.test(formData.Shipping_Address.Email)) {
      errors.Email = "Please enter a valid email";
    }
  }

  if (formData.Shipping_Address.Phone === "")
    errors.Phone = "Please enter a Phone";
  if (formData.Shipping_Address.Phone !== "") {
    if (!regexPhone.test(formData.Shipping_Address.Phone)) {
      errors.Phone = "Please enter a valid phone";
    }
  }

  if (formData.Shipping_Address.Shipping_Address === "")
    errors.Shipping_Address = "Please enter a shipping address";

  if (formData.Shipping_Address.Shipping_City === "")
    errors.Shipping_City = "Please enter a shipping city";
  if (formData.Shipping_Address.Shipping_City !== "") {
    if (!regexNoNumber.test(formData.Shipping_Address.Shipping_City)) {
      errors.Shipping_City = "Please enter a valid city";
    }
  }

  if (formData.Shipping_Address.Shipping_State === "")
    errors.Shipping_State = "Please enter a shipping state";
  if (formData.Shipping_Address.Shipping_State !== "") {
    if (!regexNoNumber.test(formData.Shipping_Address.Shipping_State)) {
      errors.Shipping_State = "Please enter a valid state";
    }
  }

  if (formData.Shipping_Address.Shipping_ZipCode === "")
    errors.Shipping_ZipCode = "Please enter a shipping zip code";
  if (formData.Shipping_Address.Shipping_ZipCode !== "") {
    if (!regexNumber.test(formData.Shipping_Address.Shipping_ZipCode)) {
      errors.Shipping_ZipCode = "Please enter a valid shipping zip code";
    }
  }

  if (formData.Shipping_Method === "")
    errors.Shipping_Method = "Please enter Shipping Method";

  // if (formData.Payment_Method.Method === "")
  //   errors.Method = "Please enter a method";

  // if (formData.Payment_Method.CreditCardNumber === "")
  //   errors.CreditCardNumber = "Please enter a creditcard number";
  // if (formData.Payment_Method.CreditCardNumber !== "") {
  //   if (!regexCard.test(formData.Payment_Method.CreditCardNumber)) {
  //     errors.CreditCardNumber = "Please enter a valid credit card";
  //   }
  // }

  // if (formData.Payment_Method.ExpirationDateMonth === "")
  //   errors.ExpirationDateMonth = "Please enter a expiration date month";

  // if (formData.Payment_Method.ExpirationDateYear === "")
  //   errors.ExpirationDateYear = "Please enter a expiration date year";

  // if (formData.Payment_Method.Cvv === "") errors.Cvv = "Please enter a cvv";

  return errors;
};

export const validateCompletedInputsAddress = (formData) => {
  const errors: any = {};
  const regexNumber = /^[+]?\d+$/;
  const regexPhone = /^[0-9+\s()-]+$/;
  const regexNoNumber = /^[^\d]*$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regexOnlyLetters = /^[a-zA-Z\s]+$/;
  const regexCard = /^[0-9\s]+$/;

  if (formData.Nickname === "")
    errors.Nickname = "Please enter a nickname";
  
  if (formData.Address === "")
    errors.Address = "Please enter an address";
  
  if (formData.City === "")
    errors.City = "Please enter a city";
  
  if (formData.State === "")
    errors.State = "Please enter an state";

  if (formData.ZipCode === "")
    errors.ZipCode = "Please enter a ZipCode";
  
  return errors;
};
