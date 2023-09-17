export interface PropsLogIn {
  setActiveLogin: React.Dispatch<React.SetStateAction<boolean>>;
  smallerThan600: boolean;
  smallerThan1200: boolean;
  smallerThan1450: boolean;
}

export interface FormErrorsLogin {
    email?: string;
    password?: string;
  }

export interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    zipCode?: string;
    billingZipCode?: string;
  }