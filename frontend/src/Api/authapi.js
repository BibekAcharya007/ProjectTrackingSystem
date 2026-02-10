import api from "./api";

export const loginApi = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};
