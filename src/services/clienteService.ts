import { api } from "./api";

export interface Cliente {
  dsNome: string;
  dtNascimento: string;
  dsGenero: string;
  dsCpf: string;
  dsTelefone: string;
  dsEndereco: string;
}

export const ClienteService = {
  create: async (cliente: Cliente) => {
    const response = await api.post("/clientes", cliente);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/clientes");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },
  update: async (id: string, cliente: Cliente) => {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  }
}