import axiosInstance from "../api/axiosConfig";

export const login = async (loginData) => {
  const response = await axiosInstance.post("login", loginData);
  return response.data;
};

export const signup = async (signupData) => {
  const response = await axiosInstance.post("signup", signupData);
  return response.data;
};
