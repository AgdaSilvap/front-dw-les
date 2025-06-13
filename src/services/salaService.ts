import { api } from "./api";

export interface Sala {
  qtCapacidade: number;
  dsApelido: string;
  refrigerado: boolean;
  dtCarga?: string;
}

export const SalaService = {
  create: async (sala: Sala) => {
    const response = await api.post("/salas", sala);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/salas");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/salas/${id}`);
    return response.data;
  },
  update: async (id: string, sala: Sala) => {
    const response = await api.put(`/salas/${id}`, sala);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/salas/${id}`);
    return response.data;
  }
};