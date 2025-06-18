import { api } from "./api";

export interface Reserva {
  dtReserva: string;
  dtInicio: string;
  dtTermino: string;
  clienteId: string;
  funcionarioId: string;
  salaId: string;
  qtPessoas: number;
}

export const ReservaService = {
  create: async (reserva: Reserva) => {
    const response = await api.post("/reservas", reserva);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/reservas");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get(`/reservas/${id}`);
    return response.data;
  },
  update: async (id: string, reserva: Reserva) => {
    const response = await api.put(`/reservas/${id}`, reserva);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/reservas/${id}`);
    return response.data;
  },
  listarReservasPorCliente: async (clienteId: string) => {
    const response = await api.get(`/clientes/${clienteId}/reservas`);
    return response.data;
  },
};