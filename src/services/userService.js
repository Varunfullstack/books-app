import axiosInstance from "../api/axiosConfig";

export const updateProfile = async (id, profileData) => {
  const response = await axiosInstance.patch(`users/${id}`, profileData);
  return response.data;
};
