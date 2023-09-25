import axios from "axios";

export const createCheckout = async (CustomerId: number) => {
  try {
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

export const confirmCheckout = async (CustomerId: number, ProjectId: number, ShippingMethod: string, Payments: any ) => {
  try {
    const bodyCust = {
      CustomerId,
      ProjectId,
      ShippingMethod,
      Payments
    };

    const response = await axios.patch("http://localhost:5000/api/checkout", bodyCust);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error", error);
  }
};