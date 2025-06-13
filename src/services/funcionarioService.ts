import { api } from "./api";

export interface Funcionario {
  dsNome: string;
  dtNascimento: string;
  dsGenero: string;
  dsCpf: string;
  dsTelefone: string;
  dsEndereco: string;
}

export const FuncionarioService = {
  create: async (funcionario: Funcionario) => {
    const response = await api.post("/funcionarios", funcionario);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/funcionarios");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/funcionarios/${id}`);
    return response.data;
  },
  update: async (id: string, funcionario: Funcionario) => {
    const response = await api.put(`/funcionarios/${id}`, funcionario);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/funcionarios/${id}`);
    return response.data;
  }
}