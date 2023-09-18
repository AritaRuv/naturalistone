import axios from "axios";

export const createCheckout = async (CustomerId: number) => {
  try {
    console.log(CustomerId)
    const bodyCust = {
      CustomerId : CustomerId
    };
    const response = await axios.post("http://localhost:5000/api/checkout", bodyCust);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error", error);
  }
};

export const confirmCheckout = async (CustomerId: number, ProjectId: number, SecretStripe: string, ShippingMethod:string, Total: number) => {
  try {
    const bodyCust = {
      CustomerId,
      ProjectId,
      SecretStripe,
      ShippingMethod,
      Total
    };

    const response = await axios.patch("http://localhost:5000/api/checkout", bodyCust);
      console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error", error);
  }
};