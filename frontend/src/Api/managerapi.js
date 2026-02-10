import api from "./api";

export const getManagerMe = async () => {
  const res = await api.get("/manager/me");
  return res.data;
};

export const getManagerDashboard = async () => {
  const res = await api.get("/manager/dashboard");
  return res.data;
};

export const getManagerEmployees = async () => {
  const res = await api.get("/manager/employees");
  return res.data;
};

export const getManagerProjects = async () => {
  const res = await api.get("/manager/projects");
  return res.data;
};

export const assignEmployeeApi = async (payload) => {
  const res = await api.post("/manager/assign", payload);
  return res.data;
};
