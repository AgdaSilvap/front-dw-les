import { useEffect, type FormEvent } from 'react';
import { enableBootstrapValidation } from '../utils/scripts';
import { ClienteService } from '../services/clienteService';

export const ClienteRegister = () => {

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

        const cliente = {
            dsNome: form.nome.value,
            dtNascimento: new Date(
                form.dataNascimento.value.split('/').reverse().join('-')
            ).toISOString(),
            dsGenero: form.genero.value,
            dsCpf: form.cpf.value,
            dsTelefone: form.telefone.value,
            dsEndereco: form.endereco.value,
        };

        try {
            await ClienteService.create(cliente);
            alert('Cliente cadastrado com sucesso!');
            form.reset();
            form.classList.remove('was-validated');
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro ao cadastrar cliente. Tente novamente.');
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <h3 className="nome-sistema fw-bold">Cadastro de Cliente</h3>
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="mb-3">
                                <label htmlFor="nome" className="form-label nome-sistema">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    placeholder="Digite o nome do Cliente"
                                    minLength={3}
                                    maxLength={50}
                                    required />
                                <div className="invalid-feedback">
                                    O nome é obrigatório.
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
                            <div className="mb-3">
                                <label htmlFor="genero" className="form-label nome-sistema">
                                    Gênero
                                </label>
                                <select
                                    name="genero"
                                    id="genero"
                                    className="form-select"
                                    required
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Selecione um gênero
                                    </option>
                                    <option>Feminino</option>
                                    <option>Masculino</option>

                                </select>
                                <div className="invalid-feedback">O gênero é obrigatório.</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="cpf" className="form-label nome-sistema">CPF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cpf"
                                    placeholder="000.000.000-00"
                                    minLength={14}
                                    maxLength={14}
                                    onInput={(e) => {
                                        let value = (e.target as HTMLInputElement).value;
                                        value = value.replace(/\D/g, ""); // Remove tudo que não é número

                                        if (value.length > 3) value = value.slice(0, 3) + "." + value.slice(3);
                                        if (value.length > 7) value = value.slice(0, 7) + "." + value.slice(7);
                                        if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
                                        if (value.length > 14) value = value.slice(0, 14);

                                        (e.target as HTMLInputElement).value = value;
                                    }}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefone" className="form-label nome-sistema">Telefone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="telefone"
                                    placeholder="(00) 00000-0000"
                                    minLength={14} // Min 14 para (00) 0000-0000
                                    maxLength={15} // Max 15 para (00) 00000-0000
                                    onInput={(e) => {
                                        let value = (e.target as HTMLInputElement).value;
                                        value = value.replace(/\D/g, ""); // Remove tudo que não é número

                                        if (value.length > 0) value = "(" + value;
                                        if (value.length > 3) value = value.slice(0, 3) + ") " + value.slice(3);

                                        // Verifica se é um celular (9 dígitos + DDD) ou fixo (8 dígitos + DDD)
                                        if (value.length > 9 && value.length < 14) { // Se for 8 digitos + DDD
                                            value = value.slice(0, value.length - 4) + "-" + value.slice(value.length - 4);
                                        } else if (value.length >= 14) { // Se for 9 digitos + DDD
                                            value = value.slice(0, value.length - 4) + "-" + value.slice(value.length - 4);
                                        }

                                        if (value.length > 15) value = value.slice(0, 15);


                                        (e.target as HTMLInputElement).value = value;
                                    }}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="endereco" className="form-label nome-sistema">Endereço</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="endereco"
                                    placeholder="Digite o Endereço"
                                    minLength={3}
                                    maxLength={50}
                                    required />
                                <div className="invalid-feedback">
                                    O endereço é obrigatório.
                                </div>
                            </div>

                            <button type="submit" className="btn-form fw-semibold w-100 mt-5">Cadastrar</button>
                        </form>
                    </div>
                    <div className="col-6 align-items-center d-flex justify-content-center">
                        <img src={`${import.meta.env.BASE_URL}autor.png`} alt="Uma mulher escrevendo em um caderno" className="img-fluid mx-auto w-50" />
                    </div>
                </div>
            </div>
        </>
    );
}
