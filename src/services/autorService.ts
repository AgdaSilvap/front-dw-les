import { api } from "./api";

export interface Autor {
  nome: string;
  nacionalidade: string;
  nascimento: string;
}

export const AutorService = {
  create: async (autor: Autor) => {
    const response = await api.post("/autores", autor);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/autores");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/autores/${id}`);
    return response.data;
  },
  update: async (id: string, autor: Autor) => {
    const response = await api.put(`/autores/${id}`, autor);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/autores/${id}`);
    return response.data;
  }
}