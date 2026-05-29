import api from "../api/axios";

export const getAnalysisHistory = async () => {
  const response = await api.get("/history");

  return response.data;
};