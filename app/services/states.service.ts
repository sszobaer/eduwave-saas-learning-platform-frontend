import { api } from "../lib/axios";

export const getStates = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};
