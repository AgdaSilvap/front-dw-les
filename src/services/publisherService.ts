import { api } from "./api";

export interface Editora {
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
  website: string;
}

export const PublisherService = {
  create: async (editora: Editora) => {
    const response = await api.post("/editoras", editora);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/editoras");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/editoras/${id}`);
    return response.data;
  },
  update: async (id: string, editora: Editora) => {
    const response = await api.put(`/editoras/${id}`, editora);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/editoras/${id}`);
    return response.data;
  }
};