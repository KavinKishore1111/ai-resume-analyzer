import api from "../api/axios";

export const getCurrentUser = async () => {
  const response = await api.get("/me");

  return response.data;
};