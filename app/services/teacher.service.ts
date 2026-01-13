import { api } from "../lib/axios";

export const TeacherService = {
  pending: () => api.get("/admin/teachers/pending"),
  approve: (id: number) => api.patch(`/admin/teachers/approve/${id}`),
  reject: (id: number) => api.delete(`/admin/teachers/reject/${id}`),
};
