import { User } from "@/store/login/typeLogin";
export interface IFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  unitNumber: string;
  addressObservations: string;
  password: string;
  zipCode: string;
  billingAddress: string;
  billingUnitNumber: string;
  billingState: string;
  billingObservations: string;
  city: string;
  companyPosition: string;
  customerId: string;
  }
  
export interface IShowMenu {
  user?: User;
  isSmallThan750?: boolean;
  formData?: IFormData;
  setFormData?: React.Dispatch<React.SetStateAction<IFormData>>;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  site?: string;
  }
  
export interface userButton {
  onClose?: () => void;
  site?: string;
  }