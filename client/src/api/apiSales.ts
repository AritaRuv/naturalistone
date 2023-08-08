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
