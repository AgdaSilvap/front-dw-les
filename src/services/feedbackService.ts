import { api } from "./api";

export interface Feedback {
  id?: number;
  reservaId: number;
  experiencia: string;
  avaliacao: boolean;
  quantidadePessoas: number;
  createdAt?: string;
  updatedAt?: string;
  reserva?: {
    id: number;
    descricao: string;
    clienteId: number;
    dtInicio: string;
  };
}

export interface FeedbackChartData {
  mes: string;
  quantidade: number;
};

export const FeedbackService = {
  create: async (feedback: Feedback) => {
    const response = await api.post("/feedbacks", feedback);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/feedbacks");
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/feedbacks/${id}`);
    return response.data;
  },

  update: async (id: string, feedback: Feedback) => {
    const response = await api.put(`/feedbacks/${id}`, feedback);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/feedbacks/${id}`);
    return response.data;
  },

  relatorioFeedbackPeriodo: async (dtInicio: string, dtTermino: string): Promise<FeedbackChartData[]> => {
    const response = await api.post("/relatorio-feedback-periodo", {
      dtInicio,
      dtTermino,
    });
    return response.data;
  },

};
