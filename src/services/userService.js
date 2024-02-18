import axiosInstance from "../api/axiosConfig";

export const listUsers = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get("users", {
      params: { _page: page, _per_page: limit, _sort: "id", _order: "desc" },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const updateProfile = async (id, profileData) => {
  const response = await axiosInstance.patch(`users/${id}`, profileData);
  return response.data;
};
