import { api } from "./api";

export interface Livro {
  dsTitulo: string;
  dtPublicacao: string; 
  isbn: string;
  dsGenero: string;
  nrPaginas: number;
  dsTipo: string;
}

export const LivroService = {
  create: async (livro: Livro) => {
    const response = await api.post("/livros", livro);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/livros");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/livros/${id}`);
    return response.data;
  },
  update: async (id: string, livro: Livro) => {
    const response = await api.put(`/livros/${id}`, livro);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/livros/${id}`);
    return response.data;
  }
}