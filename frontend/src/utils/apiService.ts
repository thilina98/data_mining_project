import axios from "axios";

// Example usage
const url = "http://localhost:4000/poems";
// const data = { name: "John Doe", email: "johndoe@example.com" };
// const responseData = await postData(url, data);

// console.log(responseData);

// const postData = async (url: string, data: any) => {
//   try {
//     const response = await axios.post(url, data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

const axiosInstance = axios.create({
  baseURL: url,
});

export const getAllPoems = async () => {
  try {
    const response = await axiosInstance.get("/all-poems");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching poems");
  }
};

export const getPoemBySearch = async (text: string) => {
  try {
    const response = await axiosInstance.post(`/poems-by-text`, { text });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("error fetching poems by search");
  }
};

export const getAuthors = async (text: string) => {
  try {
    const response = await axiosInstance.post(`/poem-poets-by-text`, { text });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("error fetching authors");
  }
};

export const getYears = async (text: string) => {
  try {
    const response = await axiosInstance.post(`/poem-year-by-text`, { text });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("error fetching years");
  }
};

export const getPoemNames = async (text: string) => {
  try {
    const response = await axiosInstance.post(`/poem-names-by-text`, { text });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("error fetching poem names");
  }
};

export const getAllPoemNames = async () => {
  try {
    const response = await axiosInstance.get(`/all-poems-names`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("error fetching poem names");
  }
};

export const getAllPoetsNames = async () => {
  try {
    const response = await axiosInstance.get(`/all-poets-names`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("error fetching poets names");
  }
};

export const getAllYears = async () => {
  try {
    const response = await axiosInstance.get(`/years`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("error fetching years");
  }
};
