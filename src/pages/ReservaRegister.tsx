import { useEffect, useState, type FormEvent } from 'react';
import { enableBootstrapValidation } from '../utils/scripts';
import { ReservaService } from '../services/reservaService';
import { ClienteService } from '../services/clienteService';
import { FuncionarioService } from '../services/funcionarioService';
import { SalaService } from '../services/salaService';

interface Cliente {
  id: number;
  dsNome: string;
}

interface Funcionario {
  id: number;
  dsNome: string;
}

interface Sala {
  id: number;
  dsApelido: string;
}

export const ReservaRegister = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    enableBootstrapValidation();

    ClienteService.getAll()
      .then((data) => setClientes(data))
      .catch((error) => {
        console.error('Erro ao carregar clientes:', error);
        alert('Erro ao carregar clientes. Verifique sua conexão.');
      });

    FuncionarioService.getAll()
      .then((data) => setFuncionarios(data))
      .catch((error) => {
        console.error('Erro ao carregar funcionários:', error);
        alert('Erro ao carregar funcionários. Verifique sua conexão.');
      });

    SalaService.getAll()
      .then((data) => setSalas(data))
      .catch((error) => {
        console.error('Erro ao carregar salas:', error);
        alert('Erro ao carregar salas. Verifique sua conexão.');
      });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const data = new FormData(form);
    const reserva = {
      dtReserva: data.get('dtReserva') as string,
      dtInicio: data.get('dtInicio') as string,
      dtTermino: data.get('dtTermino') as string,
      clienteId: data.get('clienteId') as string,
      funcionarioId: data.get('funcionarioId') as string,
      salaId: data.get('salaId') as string,

      qtPessoas: Number(data.get('qtPessoas')),
    };

    if (new Date(reserva.dtTermino) <= new Date(reserva.dtInicio)) {
      alert('A data de término deve ser posterior à data de início.');
      return;
    }

    if (reserva.qtPessoas < 1) {
      alert('A quantidade de pessoas deve ser ao menos 1.');
      return;
    }

    try {
      setIsSubmitting(true);
      await ReservaService.create(reserva);
      alert('Reserva realizada com sucesso!');
      form.reset();
      form.classList.remove('was-validated');
    } catch (error: any) {
      console.error('Erro ao fazer reserva:', error);
      alert(error?.response?.data?.message || 'Erro ao fazer reserva. Verifique as regras.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-6">
          <h3 className="nome-sistema fw-bold">Cadastro de Reserva</h3>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="dtReserva" className="form-label">Data da Reserva</label>
              <input type="datetime-local" className="form-control" id="dtReserva" name="dtReserva" required />
              <div className="invalid-feedback">Informe a data da reserva.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="dtInicio" className="form-label">Início</label>
              <input type="datetime-local" className="form-control" id="dtInicio" name="dtInicio" required />
              <div className="invalid-feedback">Informe a data e hora de início.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="dtTermino" className="form-label">Término</label>
              <input type="datetime-local" className="form-control" id="dtTermino" name="dtTermino" required />
              <div className="invalid-feedback">Informe a data e hora de término.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="clienteId" className="form-label">Cliente</label>
              <select className="form-select" id="clienteId" name="clienteId" required>
                <option value="">Selecione</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.dsNome}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecione o cliente.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="funcionarioId" className="form-label">Funcionário</label>
              <select className="form-select" id="funcionarioId" name="funcionarioId" required>
                <option value="">Selecione</option>
                {funcionarios.map((f) => (
                  <option key={f.id} value={f.id}>{f.dsNome}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecione o funcionário.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="salaId" className="form-label">Sala</label>
              <select className="form-select" id="salaId" name="salaId" required>
                <option value="">Selecione</option>
                {salas.map((s) => (
                  <option key={s.id} value={s.id}>{s.dsApelido}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecione a sala.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="qtPessoas" className="form-label">Quantidade de Pessoas</label>
              <input type="number" className="form-control" id="qtPessoas" name="qtPessoas" min={1} required />
              <div className="invalid-feedback">Informe a quantidade de pessoas.</div>
            </div>

            <button type="submit" className="btn-form fw-semibold w-100 mt-4" disabled={isSubmitting}>
              {isSubmitting ? 'Reservando...' : 'Reservar'}
            </button>
          </form>
        </div>

        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={`${import.meta.env.BASE_URL}reserva.png`} alt="Imagem de reserva" className="img-fluid w-50" />
        </div>
      </div>
    </div>
  );
};
