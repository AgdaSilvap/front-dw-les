import { useEffect } from 'react';
import { enableBootstrapValidation } from '../utils/scripts';

export const AutorRegister = () => {
  useEffect(() => {
    enableBootstrapValidation();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h3 className="nome-sistema fw-bold">Cadastro de Autor</h3>
            <form action="submit" className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label nome-sistema">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  placeholder="Digite o nome do autor"
                  minLength={3}
                  maxLength={50}
                  required />
                <div className="invalid-feedback">
                  O nome é obrigatório.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="nacionalidade" className="form-label nome-sistema">Nacionalidade</label>
                <input
                  type="text"
                  className="form-control"
                  id="nacionalidade"
                  placeholder="Digite a nacionalidade do autor"
                  minLength={3}
                  maxLength={30}
                  required />
                <div className="invalid-feedback">
                  A nacionalidade é obrigatória.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="dataNascimento" className="form-label nome-sistema">Data de Nascimento</label>
                <input
                  type="text"
                  className="form-control"
                  id="dataNascimento"
                  placeholder="dd/mm/aaaa"
                  minLength={10}
                  maxLength={10}
                  onInput={(e) => {
                    let value = (e.target as HTMLInputElement).value;
                    value = value.replace(/\D/g, ""); // Remove tudo que não é número

                    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
                    if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5);
                    if (value.length > 10) value = value.slice(0, 10);

                    (e.target as HTMLInputElement).value = value;
                  }}
                  required
                />

                <div className="invalid-feedback">
                  A data de nascimento é obrigatória.
                </div>
              </div>
              <button type="submit" className="btn-form fw-semibold w-100 mt-5">Cadastrar</button>
            </form>
          </div>
          <div className="col-6 align-items-center d-flex justify-content-center">
            <img src="/autor.png" alt="Uma mulher escrevendo em um caderno" className="img-fluid mx-auto w-50" />
          </div>
        </div>
      </div>
    </>
  );
}
