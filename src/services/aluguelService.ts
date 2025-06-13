import { api } from "./api";

export interface Aluguel {
  dtAluguel: string;
  dtDevolucao: string;
  dsTipoAluguel: string;
  vlTotal: string;
}

export const AluguelService = {
  create: async (aluguel: Aluguel) => {
    const response = await api.post("/alugueis", aluguel);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/alugueis");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/alugueis/${id}`);
    return response.data;
  },
  update: async (id: string, aluguel: Aluguel) => {
    const response = await api.put(`/alugueis/${id}`, aluguel);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/alugueis/${id}`);
    return response.data;
  }
}