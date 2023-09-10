import axios from "axios";

export const createCheckout = async (CustomerId: number) => {
    try {
        const bodyCust = {
            CustomerId
        };
        const response = await axios.post("http://localhost:5000/api/checkout", bodyCust);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error", error);
    }
};

export const updateCheckout = async (CustomerId: number) => {
    try {
        const bodyCust = {
            CustomerId
        };
        const response = await axios.post("http://localhost:5000/api/checkout", bodyCust);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error", error);
    }
};