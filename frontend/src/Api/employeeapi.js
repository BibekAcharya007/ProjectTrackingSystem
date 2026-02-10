import api from "./api";

export const createEmployeeApi = async (payload) => {
  const res = await api.post("/employee/create", payload);
  return res.data;
};

export const getEmployeeMe = async () => {
  const res = await api.get("/employee/me");
  return res.data;
};

export const getEmployeeProject = async () => {
  const res = await api.get("/employee/project");
  return res.data;
};

export const getEmployeeManager = async () => {
  const res = await api.get("/employee/manager");
  return res.data;
};
