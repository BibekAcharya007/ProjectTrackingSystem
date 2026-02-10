import api from "./api";

export const createProjectApi = async (payload) => {
  const res = await api.post("/project/create", payload);
  return res.data;
};

export const getAllProjectsApi = async () => {
  const res = await api.get("/project/all");
  return res.data;
};

export const getProjectByIdApi = async (projectId) => {
  const res = await api.get(`/project/${projectId}`);
  return res.data;
};

export const getProjectEmployeesApi = async (projectId) => {
  const res = await api.get(`/project/${projectId}/employees`);
  return res.data;
};

export const filterProjectsByDateApi = async (startDate, endDate) => {
  const res = await api.get(`/project/filter/by-date?start_date=${startDate}&end_date=${endDate}`);
  return res.data;
};
