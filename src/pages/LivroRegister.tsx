import { useEffect, type FormEvent } from 'react';
import { enableBootstrapValidation } from '../utils/scripts';
import { LivroService } from '../services/livroService';

export const LivroRegister = () => {

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

    const livro = {
      dsTitulo: form.dsTitulo.value.trim(),
      dtPublicacao: new Date(
        form.dtPublicacao.value.split('/').reverse().join('-')
      ).toISOString(),
      isbn: form.isbn.value.trim(),
      dsGenero: form.dsGenero.value.trim(),
      nrPaginas: parseInt(form.nrPaginas.value, 10),
      dsTipo: form.dsTipo.value.trim(),
    };

    try {
      await LivroService.create(livro);
      alert('Livro cadastrado com sucesso!');
      form.reset();
      form.classList.remove('was-validated');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      alert('Erro ao cadastrar livro. Tente novamente.');
    }
  }


return (
  <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <h3 className="nome-sistema fw-bold">Cadastro de Livro</h3>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="dsTitulo" className="form-label nome-sistema">Título do Livro</label>
              <input
                type="text"
                className="form-control"
                id="dsTitulo"
                placeholder="Digite o título do livro"
                minLength={3}
                maxLength={50}
                required
              />
              <div className="invalid-feedback">
                O título do livro é obrigatório e deve ter entre 3 e 50 caracteres.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="dtPublicacao" className="form-label nome-sistema">Data de Publicação</label>
              <input
                type="text"
                className="form-control"
                id="dtPublicacao"
                placeholder="dd/mm/aaaa"
                minLength={10}
                maxLength={10}
                required
                onInput={(e) => {
                  let value = (e.target as HTMLInputElement).value;
                  value = value.replace(/\D/g, "");

                  if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
                  if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5);
                  if (value.length > 10) value = value.slice(0, 10);

                  (e.target as HTMLInputElement).value = value;
                }}
              />
              <div className="invalid-feedback">
                A data de publicação é obrigatória.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="isbn" className="form-label nome-sistema">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                placeholder="Digite o ISBN do livro"
                required
              />
              <div className="invalid-feedback">
                O ISBN é obrigatório.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="dsGenero" className="form-label nome-sistema">Gênero</label>
              <input
                type="text"
                className="form-control"
                id="dsGenero"
                placeholder="Digite o gênero do livro"
                required
              />
              <div className="invalid-feedback">
                O gênero é obrigatório.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="nrPaginas" className="form-label nome-sistema">Número de Páginas</label>
              <input
                type="number"
                className="form-control"
                id="nrPaginas"
                placeholder="Digite o número de páginas"
                min={1}
                required
              />
              <div className="invalid-feedback">
                O número de páginas é obrigatório.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="dsTipo" className="form-label nome-sistema">Tipo</label>
              <select className="form-select" id="dsTipo" required>
                <option value="">Selecione o tipo</option>
                <option value="Técnico">Técnico</option>
                <option value="Literatura">Literatura</option>
              </select>
              <div className="invalid-feedback">
                O tipo do livro é obrigatório.
              </div>
            </div>

            <button type="submit" className="btn-form fw-semibold w-100 mt-5">Cadastrar</button>
          </form>
        </div>

        <div className="col-6 align-items-center d-flex justify-content-center">
          <img src="/livro.png" alt="Uma pilha de livros" className="img-fluid mx-auto w-50" />
        </div>
      </div>
    </div>
  </>
);
}
