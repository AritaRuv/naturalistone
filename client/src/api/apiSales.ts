import axios from "axios";

export async function getSalesByProject(idProject: number) {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/sales/project/${idProject}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSalesByCustomer(idCustomer: number) {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/sales/customer/${idCustomer}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSalesDetails(idSales: number) {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/sales/details/${idSales}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
