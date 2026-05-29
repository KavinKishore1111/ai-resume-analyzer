import api from "../api/axios";

export const analyzeResume = async (
  file,
  jobDescription
) => {
  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "job_description",
    jobDescription
  );

  const response = await api.post(
    "/analyze",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};