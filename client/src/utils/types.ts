export interface EmailNaturali {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ErrorsProfile {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  zipCode?: string;
}

export interface ErrorsProject {
  projectName?: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZipCode?: string;
}
