import { useEffect, useState, type FormEvent } from "react";
import { enableBootstrapValidation } from "../utils/scripts";
import { ClienteService } from "../services/clienteService";
import { ReservaService } from "../services/reservaService";
import { FeedbackService } from "../services/feedbackService";

type Cliente = { id: string; dsNome: string };
type Reserva = { id: string; descricao: string };

export const FeedbackPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<string>("");

  useEffect(() => {
    enableBootstrapValidation();

    ClienteService.getAll()
      .then((data) => setClientes(data))
      .catch((error) => {
        console.error("Erro ao carregar clientes:", error);
        alert("Erro ao carregar clientes. Verifique sua conexão.");
      });
  }, []);

  useEffect(() => {
    if (!clienteSelecionado) {
      setReservas([]); // limpa reservas se nenhum cliente selecionado
      return;
    }

    ReservaService.listarReservasPorCliente(clienteSelecionado)
      .then((data) => setReservas(data))
      .catch((error) => {
        console.error("Erro ao carregar reservas:", error);
        alert("Erro ao carregar reservas. Verifique sua conexão.");
      });
  }, [clienteSelecionado]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const feedback = {
      reservaId: form.reserva.value,
      avaliacao: form.radioDefault.value === 'positiva',
      quantidadePessoas: parseInt(form['qtd-pessoas'].value, 10),
      experiencia: form.feedback.value,
    };

    try {
      await FeedbackService.create(feedback);
      alert('Feedback cadastrado com sucesso!');
      form.reset();
      form.classList.remove('was-validated');
    } catch (error: any) {
      console.error('Erro ao cadastrar feedback:', error);

      // Tenta extrair mensagem específica do backend
      const errorMessage =
        error?.response?.data?.message || // caso esteja como { message: "..." }
        error?.response?.data ||          // caso o backend retorne string simples
        'Erro desconhecido ao cadastrar feedback.';

      alert(`Erro ao cadastrar feedback: ${errorMessage}`);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h3 className="nome-sistema fw-bold">Feedback de Reserva de Leitura</h3>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="cliente" className="form-label nome-sistema">
                  Cliente
                </label>
                <select
                  name="cliente"
                  id="cliente"
                  className="form-select"
                  required
                  defaultValue=""
                  onChange={(e) => setClienteSelecionado(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione um cliente
                  </option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.dsNome}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">O cliente é obrigatório.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="reserva" className="form-label nome-sistema">
                  Reserva
                </label>
                <select
                  name="reserva"
                  id="reserva"
                  className="form-select"
                  required
                  defaultValue=""
                  disabled={!clienteSelecionado} // desabilita se não há cliente
                >
                  <option value="" disabled>
                    Selecione uma reserva
                  </option>
                  {reservas.map((reserva) => (
                    <option key={reserva.id} value={reserva.id}>
                      {reserva.id}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">A reserva é obrigatória.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="qtd-pessoas" className="form-label nome-sistema ">
                  Quantas pessoas compartilharam a sala com você?
                </label>
                <select
                  name="qtd-pessoas"
                  id="qtd-pessoas"
                  className="form-select"
                  required
                >
                  <option value="">Selecione uma opção</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <div className="invalid-feedback">
                  A quantidade de pessoas é obrigatória.
                </div>
              </div>

              <div className="mb-3 px-0 form-check">
                <p className="nome-sistema ">Você considera que sua Experiência foi:</p>
                <label className="form-check-label form-check-inline" htmlFor="positiva">
                  <input
                    className="form-check-input mx-1"
                    type="radio"
                    name="radioDefault"
                    id="positiva"
                  />
                  positiva
                </label>
                <label className="form-check-label form-check-inline" htmlFor="negativa">
                  <input
                    className="form-check-input mx-1"
                    type="radio"
                    name="radioDefault"
                    id="negativa"
                  />
                  negativa
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="experiencia" className="form-label nome-sistema">
                  Descreva como foi sua experiência da reserva de sala de leitura
                </label>
                <textarea
                  name="experiencia"
                  id="feedback"
                  rows={5}
                  className="form-control"
                  required
                  minLength={5}
                  maxLength={255}
                ></textarea>
                <div className="invalid-feedback">
                  O feedback deve conter entre 5 e 255 caracteres.
                </div>
              </div>

              <button type="submit" className="btn-form w-100 mt-5 fw-semibold">
                Enviar Feedback
              </button>
            </form>
          </div>

          <div className="col-6 align-items-center d-flex justify-content-center">
            <img src={`${import.meta.env.BASE_URL}feedback.png`} alt="Imagem de feedback" className="img-fluid mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}