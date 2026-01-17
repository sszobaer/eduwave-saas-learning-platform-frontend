import { api } from "../lib/axios";

export const getStates = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};


export const getTeacherStates = async () => {
  const res = await api.get("/teacher/dashboard");
  return res.data;
};