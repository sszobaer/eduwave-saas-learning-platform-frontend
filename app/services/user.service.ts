import { api } from "../lib/axios";


export const UserService = {
  getAll: () => api.get("/admin/users/getall"),
  getOne: (id: number) => api.get(`/admin/users/getone/${id}`),
  update: (id: number, data: any) => api.put(`/admin/users/${id}`, data),
  delete: (id: number) => api.delete(`/admin/users/delete/${id}`),
  block: (id: number) => api.patch(`/admin/users/block/${id}`),
  unblock: (id: number) => api.patch(`/admin/users/unblock/${id}`),
};