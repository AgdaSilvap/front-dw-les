import { useEffect, type FormEvent } from 'react';
import { enableBootstrapValidation } from '../utils/scripts';
import { SalaService } from '../services/salaService';

export const SalaRegister = () => {

  useEffect(() => {
    enableBootstrapValidation();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const sala = {
      qtCapacidade: parseInt(form.qtCapacidade.value, 10),
      dsApelido: form.dsApelido.value.trim(),
      refrigerado: form.refrigerado.value === 'true',
    };

    try {
      await SalaService.create(sala);
      alert('Sala cadastrada com sucesso!');
      form.reset();
      form.classList.remove('was-validated');
    } catch (error) {
      console.error('Erro ao cadastrar sala:', error);
      alert('Erro ao cadastrar sala. Tente novamente.');
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            <h3 className="nome-sistema fw-bold">Cadastro de Sala</h3>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="dsApelido" className="form-label nome-sistema">Nome da Sala</label>
                <input
                  type="text"
                  className="form-control"
                  id="dsApelido"
                  placeholder="Digite o nome da sala"
                  required
                />
                <div className="invalid-feedback">
                  O nome da sala é obrigatório.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="qtCapacidade" className="form-label nome-sistema">Capacidade</label>
                <input
                  type="number"
                  className="form-control"
                  id="qtCapacidade"
                  placeholder="Digite a capacidade da sala"
                  min={1}
                  required
                />
                <div className="invalid-feedback">
                  A capacidade da sala é obrigatória.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="refrigerado" className="form-label nome-sistema">É refrigerada?</label>
                <select className="form-select" id="refrigerado" required>
                  <option value="">Selecione</option>
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
                <div className="invalid-feedback">
                  Selecione se a sala é refrigerada ou não.
                </div>
              </div>

              <button type="submit" className="btn-form fw-semibold w-100 mt-5">Cadastrar</button>
            </form>
          </div>

          <div className="col-12 col-md-6 align-items-center d-flex justify-content-center">
            <img src={`${import.meta.env.BASE_URL}sala.png`} alt="Imagem de uma sala" className="img-fluid mx-auto w-50" />
          </div>
        </div>
      </div>
    </>
  );
};
