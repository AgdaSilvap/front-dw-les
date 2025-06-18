import { useEffect, type FormEvent } from "react";
import { enableBootstrapValidation } from "../utils/scripts";
import { PublisherService } from "../services/publisherService";

export const PublisherRegister = () => {

  useEffect(() => {
    enableBootstrapValidation();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const editora = {
      nome: form.nome.value,
      cnpj: form.cnpj.value.replace(/\D/g, ""), // Remove tudo que não é número
      endereco: form.endereco.value,
      telefone: form.telefone.value.replace(/\D/g, ""), // Remove tudo que não é número
      email: form.email.value,
      website: form.website.value,
    };
    try {
      await PublisherService.create(editora);
      alert("Editora cadastrada com sucesso!");
      form.reset();
      form.classList.remove("was-validated");
    } catch (error: any) {
      console.error('Erro ao cadastrar editora:', error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        'Erro desconhecido ao cadastrar editora.';

      alert(`Erro ao cadastrar editora: ${errorMessage}`);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h3 className="nome-sistema fw-bold">Cadastro de Editora</h3>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label nome-sistema">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  placeholder="Digite o nome da editora"
                  minLength={3}
                  maxLength={50}
                  required />
                <div className="invalid-feedback">
                  O nome é obrigatório.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="cnpj" className="form-label nome-sistema">CNPJ</label>
                <input
                  type="text"
                  className="form-control"
                  id="cnpj"
                  placeholder="12.345.678/0001-95"
                  minLength={14}
                  maxLength={18}
                  onInput={(e) => {
                    let value = (e.target as HTMLInputElement).value;
                    value = value.replace(/\D/g, ""); // Remove tudo que não é número
                    if (value.length > 2) value = value.slice(0, 2) + "." + value.slice(2);
                    if (value.length > 6) value = value.slice(0, 6) + "." + value.slice(6);
                    if (value.length > 10) value = value.slice(0, 10) + "/" + value.slice(10);
                    if (value.length > 15) value = value.slice(0, 15) + "-" + value.slice(15);
                    if (value.length > 18) value = value.slice(0, 18);
                    (e.target as HTMLInputElement).value = value;
                  }}
                  required />
                <div className="invalid-feedback">
                  O CNPJ é obrigatório.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="endereco" className="form-label nome-sistema">Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  id="endereco"
                  placeholder="Rua Exemplo, 123 - Bairro, Cidade - UF"
                  minLength={5}
                  maxLength={50}
                  required />
                <div className="invalid-feedback">
                  O endereço é obrigatório.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="telefone" className="form-label nome-sistema">Telefone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefone"
                  placeholder="(11) 1234-5678"
                  minLength={10}
                  maxLength={17}
                  onInput={(e) => {
                    let value = (e.target as HTMLInputElement).value;
                    value = value.replace(/\D/g, ""); // Remove tudo que não é número
                    if (value.length > 2) value = value.slice(0, 2) + " " + value.slice(2);
                    if (value.length > 7) value = value.slice(0, 7) + "-" + value.slice(7);
                    if (value.length > 17) value = value.slice(0, 17);
                    (e.target as HTMLInputElement).value = value;
                  }}
                  required />
                <div className="invalid-feedback">
                  O telefone é obrigatório.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label nome-sistema">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="editora@email.com"
                  minLength={10}
                  maxLength={50}
                  required />
                <div className="invalid-feedback">
                  O e-mail é obrigatório.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="website" className="form-label nome-sistema ">Web site da Editora</label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  placeholder="https://www.exemplo.com"
                  minLength={5}
                  maxLength={50}
                  required />
                <div className="invalid-feedback">
                  O site é obrigatório.
                </div>
              </div>
              <button type="submit" className="btn-form w-100 mt-5 fw-semibold">Cadastrar</button>
            </form>
          </div>
          <div className="col-6 align-items-center d-flex justify-content-center">
            <img src="/editora.png" alt="Imagem simulando uam loja online" className="img-fluid mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
}