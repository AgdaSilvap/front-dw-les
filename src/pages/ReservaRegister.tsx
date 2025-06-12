import { useEffect, type FormEvent, useState } from 'react';
import { enableBootstrapValidation } from '../utils/scripts';
import { ReservaService } from '../services/reservaService';

export const ReservaRegister = () => {
  const [salas, setSalas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    enableBootstrapValidation();
    // Aqui você pode fazer chamadas para popular os selects
    // Ex: buscar clientes, funcionários e salas
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const reserva = {
      dtReserva: form.dtReserva.value,
      dtInicio: form.dtInicio.value,
      dtTermino: form.dtTermino.value,
      clienteId: form.clienteId.value,
      funcionarioId: form.funcionarioId.value,
      salaId: form.salaId.value,
      qtPessoas: parseInt(form.qtPessoas.value, 10)
    };

    try {
      await ReservaService.create(reserva);
      alert('Reserva realizada com sucesso!');
      form.reset();
      form.classList.remove('was-validated');
    } catch (error: any) {
      console.error('Erro ao fazer reserva:', error);
      alert(error?.response?.data?.message || 'Erro ao fazer reserva. Verifique as regras.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <h3 className="nome-sistema fw-bold">Cadastro de Reserva</h3>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="dtReserva" className="form-label">Data da Reserva</label>
              <input type="datetime-local" className="form-control" id="dtReserva" required />
              <div className="invalid-feedback">Informe a data da reserva.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="dtInicio" className="form-label">Início</label>
              <input type="datetime-local" className="form-control" id="dtInicio" required />
              <div className="invalid-feedback">Informe a data e hora de início.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="dtTermino" className="form-label">Término</label>
              <input type="datetime-local" className="form-control" id="dtTermino" required />
              <div className="invalid-feedback">Informe a data e hora de término.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="clienteId" className="form-label">Cliente</label>
              <select className="form-select" id="clienteId" required>
                <option value="">Selecione</option>
                {clientes.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecione o cliente.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="funcionarioId" className="form-label">Funcionário</label>
              <select className="form-select" id="funcionarioId" required>
                <option value="">Selecione</option>
                {funcionarios.map((f: any) => (
                  <option key={f.id} value={f.id}>{f.nome}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecione o funcionário.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="salaId" className="form-label">Sala</label>
              <select className="form-select" id="salaId" required>
                <option value="">Selecione</option>
                {salas.map((s: any) => (
                  <option key={s.id} value={s.id}>{s.ds_apelido}</option>
                ))}
              </select>
              <div className="invalid-feedback">Selecione a sala.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="qtPessoas" className="form-label">Quantidade de Pessoas</label>
              <input type="number" className="form-control" id="qtPessoas" min={1} required />
              <div className="invalid-feedback">Informe a quantidade de pessoas.</div>
            </div>

            <button type="submit" className="btn-form fw-semibold w-100 mt-4">Reservar</button>
          </form>
        </div>

        <div className="col-6 d-flex align-items-center justify-content-center">
          <img src="/reserva.png" alt="Imagem de reserva" className="img-fluid w-50" />
        </div>
      </div>
    </div>
  );
};