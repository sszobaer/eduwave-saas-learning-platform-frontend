import { api } from "../lib/axios";
import { Teacher } from "../types/teacher.type";

export const TeacherService = {
  getPending: async (): Promise<Teacher[]> => {
    const res = await api.get("/admin/teachers/pending", { withCredentials: true });
    return res.data;
  },

  approve: async (id: number) => {
    const res = await api.patch(`/admin/teachers/approve/${id}`, {}, { withCredentials: true });
    return res.data;
  },

  reject: async (id: number) => {
    const res = await api.delete(`/admin/teachers/reject/${id}`, { withCredentials: true });
    return res.data;
  },
};

