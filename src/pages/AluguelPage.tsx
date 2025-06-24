// src/pages/AluguelPage.tsx
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { enableBootstrapValidation } from "../utils/scripts";
import { AluguelService } from "../services/aluguelService";

import { ClienteService } from "../services/clienteService";
import { FuncionarioService } from "../services/funcionarioService";
import { LivroService } from "../services/livroService";

type Cliente = { id: string; dsNome: string };
type Funcionario = { id: string; dsNome: string };
type Livro = { id: string; dsTitulo: string; dsTipo: string };

type LivroAlugado = {
    id: string;
    livroId: string;
    dsTitulo: string;
    vlAluguel: number;
    dsTipo: string;
};


export const AluguelPage = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [livrosDisponiveis, setLivrosDisponiveis] = useState<Livro[]>([]);

    const [selectedLivroId, setSelectedLivroId] = useState<string>("");
    const [valorInput, setValorInput] = useState<string>("R$ 0,00");

    const [selectedClienteId, setSelectedClienteId] = useState<string>("");
    const [selectedFuncionarioId, setSelectedFuncionarioId] = useState<string>("");

    const [livrosParaAlugar, setLivrosParaAlugar] = useState<LivroAlugado[]>([]);

    const [mensagemSistema, setMensagemSistema] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);


    useEffect(() => {
        enableBootstrapValidation();

        const carregarDados = async () => {
            try {
                const clientesData = await ClienteService.getAll();
                setClientes(clientesData);
                if (clientesData.length > 0) {
                    setSelectedClienteId(String(clientesData[0].id));
                }

                const funcionariosData = await FuncionarioService.getAll();
                setFuncionarios(funcionariosData);
                if (funcionariosData.length > 0) {
                    setSelectedFuncionarioId(String(funcionariosData[0].id));
                }

                const livrosData = await LivroService.getAll();
                const livrosComValorPadrao = livrosData.map(livro => ({
                    ...livro,
                    id: String(livro.id),
                    vlAluguel: 0
                }));
                setLivrosDisponiveis(livrosComValorPadrao);

            } catch (error: any) {
                console.error("Erro ao carregar dados iniciais:", error.response?.data || error);
                setMensagemSistema({ tipo: 'error', texto: "Erro ao carregar os dados (clientes, funcionários, livros). Verifique o console." });
            }
        };

        carregarDados();
    }, []);

    useEffect(() => {
        setValorInput(formatarValorReais(0));
    }, [selectedLivroId]);


    const formatarValorReais = (valor: number): string => {
        const valorString = (valor * 100).toFixed(0);
        let formattedValue = valorString.replace(/\D/g, "");

        if (formattedValue.length < 3) {
            formattedValue = formattedValue.padStart(3, "0");
        }

        formattedValue = formattedValue.slice(0, -2) + "," + formattedValue.slice(-2);
        formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

        return "R$ " + formattedValue;
    };

    const desformatarValorReais = (valorFormatado: string): number => {
        let numericValue = valorFormatado.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
        return parseFloat(numericValue || "0");
    };

    const handleLivroChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedLivroId(e.target.value);
        const livroSelect = e.target;
        livroSelect.classList.remove('is-invalid');
    };

    const handleValorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");

        const numero = parseInt(value || "0", 10);
        setValorInput(formatarValorReais(numero / 100));
        const valorInputEl = e.target;
        valorInputEl.classList.remove('is-invalid');
    };

    const handleAddLivro = (e: FormEvent) => {
        e.preventDefault();

        setMensagemSistema(null);

        const valorDigitado = desformatarValorReais(valorInput);
        let isValid = true;

        const livroSelect = document.getElementById('livro') as HTMLSelectElement;
        const valorInputEl = document.getElementById('valor') as HTMLInputElement;

        if (!selectedLivroId) {
            livroSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            livroSelect.classList.remove('is-invalid');
        }

        if (valorDigitado <= 0) {
            valorInputEl.classList.add('is-invalid');
            isValid = false;
        } else {
            valorInputEl.classList.remove('is-invalid');
        }

        if (!isValid) {
            setMensagemSistema({ tipo: 'error', texto: "Por favor, selecione um livro e informe um valor válido (maior que R$ 0,00)." });
            return;
        }

        const livroSelecionado = livrosDisponiveis.find(l => l.id === selectedLivroId);

        if (livroSelecionado) {
            if (livrosParaAlugar.length > 0 && livroSelecionado.dsTipo !== livrosParaAlugar[0].dsTipo) {
                setMensagemSistema({ tipo: 'error', texto: `Não é permitido alugar livros de tipos diferentes em um mesmo aluguel. O tipo do livro selecionado (${livroSelecionado.dsTipo}) é diferente do(s) livro(s) já adicionado(s) (${livrosParaAlugar[0].dsTipo}).` });
                return;
            }

            const novoItem: LivroAlugado = {
                id: Math.random().toString(36).substr(2, 9),
                livroId: livroSelecionado.id,
                dsTitulo: livroSelecionado.dsTitulo,
                vlAluguel: valorDigitado,
                dsTipo: livroSelecionado.dsTipo,
            };

            setLivrosParaAlugar(prevLivros => [...prevLivros, novoItem]);

            setSelectedLivroId("");
            setValorInput("R$ 0,00");

            livroSelect.classList.remove('is-invalid');
            valorInputEl.classList.remove('is-invalid');
            setMensagemSistema(null);
        }
    };

    const handleRemoveLivro = (idParaRemover: string) => {
        setLivrosParaAlugar(livrosParaAlugar.filter(item => item.id !== idParaRemover));
    };

    const handleFinalizarAluguel = async (e: FormEvent) => {
        e.preventDefault();
        setMensagemSistema(null);

        const form = e.currentTarget as HTMLFormElement;
        form.classList.remove('was-validated');

        let isFormValid = true;

        if (!selectedClienteId) {
            document.getElementById('cliente')?.classList.add('is-invalid');
            isFormValid = false;
        } else {
            document.getElementById('cliente')?.classList.remove('is-invalid');
        }

        if (!selectedFuncionarioId) {
            document.getElementById('funcionario')?.classList.add('is-invalid');
            isFormValid = false;
        } else {
            document.getElementById('funcionario')?.classList.remove('is-invalid');
        }

        if (livrosParaAlugar.length === 0) {
            setMensagemSistema({ tipo: 'error', texto: "Adicione pelo menos um livro ao aluguel." });
            isFormValid = false;
        }

        if (!isFormValid) {
            form.classList.add('was-validated');
            return;
        }

        const livrosIdsParaBackend = livrosParaAlugar.map(item => item.livroId);

        const dadosAluguel = {
            dtAluguel: new Date().toISOString().split('T')[0],
            dtDevolucao: "",
            dsTipoAluguel: "",
            // *** MUDANÇA AQUI: Enviar o vlTotal como número, não string formatada ***
            vlTotal: calcularTotal(),
            clienteId: selectedClienteId,
            funcionarioId: selectedFuncionarioId,
            livros: livrosIdsParaBackend,
        };

        try {
            const response = await AluguelService.create(dadosAluguel);
            setMensagemSistema({ tipo: 'success', texto: "Aluguel finalizado com sucesso!" });

            console.log("------------------------------------");
            console.log("RESPOSTA DO BACKEND APÓS FINALIZAR ALUGUEL:");
            console.log(response);
            console.log("------------------------------------");

            setSelectedClienteId("");
            setSelectedFuncionarioId("");
            setSelectedLivroId("");
            setValorInput("R$ 0,00");
            setLivrosParaAlugar([]);
            form.classList.remove('was-validated');

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Erro desconhecido ao finalizar o aluguel.";
            setMensagemSistema({ tipo: 'error', texto: `Erro: ${errorMessage}` });
            console.error("Erro ao finalizar aluguel:", error.response?.data || error);
        }
    };

    const calcularTotal = (): number => {
        return livrosParaAlugar.reduce((acc, item) => acc + item.vlAluguel, 0);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <h3 className="nome-sistema fw-bold">Aluguel de Livro</h3>
                        {mensagemSistema && (
                            <div className={`alert alert-${mensagemSistema.tipo === 'success' ? 'success' : 'danger'}`} role="alert">
                                {mensagemSistema.texto}
                            </div>
                        )}
                        <form className="needs-validation" noValidate onSubmit={handleFinalizarAluguel}>
                            <div className="mb-3">
                                <label htmlFor="livro" className="form-label nome-sistema">
                                    Livro
                                </label>
                                <select
                                    name="livro"
                                    id="livro"
                                    className="form-select"
                                    value={selectedLivroId}
                                    onChange={handleLivroChange}
                                >
                                    <option value="" disabled>
                                        Selecione um livro
                                    </option>
                                    {livrosDisponiveis.map((livro) => (
                                        <option key={livro.id} value={livro.id}>
                                            {livro.dsTitulo} ({livro.dsTipo})
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">O Livro é obrigatório para adicionar.</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="valor" className="form-label nome-sistema">Valor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="valor"
                                    placeholder="R$ 0,00"
                                    value={valorInput}
                                    onInput={handleValorInputChange}
                                />
                                <div className="invalid-feedback">O valor é obrigatório e deve ser maior que R$ 0,00.</div>
                            </div>

                            <div className="d-grid mt-4">
                                <button
                                    type="button"
                                    className="btn-form fw-semibold"
                                    onClick={handleAddLivro}
                                >
                                    Adicionar
                                </button>
                            </div>

                            <div className="mb-3 mt-4">
                                <label htmlFor="cliente" className="form-label nome-sistema">
                                    Cliente
                                </label>
                                <select
                                    name="cliente"
                                    id="cliente"
                                    className="form-select"
                                    required
                                    value={selectedClienteId}
                                    onChange={(e) => setSelectedClienteId(e.target.value)}
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
                                <label htmlFor="funcionario" className="form-label nome-sistema">
                                    Funcionário
                                </label>
                                <select
                                    name="funcionario"
                                    id="funcionario"
                                    className="form-select"
                                    required
                                    value={selectedFuncionarioId}
                                    onChange={(e) => setSelectedFuncionarioId(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Selecione um funcionário
                                    </option>
                                    {funcionarios.map((funcionario) => (
                                        <option key={funcionario.id} value={funcionario.id}>
                                            {funcionario.dsNome}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">O funcionário é obrigatório.</div>
                            </div>

                            <button type="submit" className="btn-form w-100 mt-5 fw-semibold">
                                Finalizar
                            </button>
                        </form>
                    </div>

                    <div className="col-6">
                        <div className="card shadow-sm p-3">
                            <table className="table table-striped mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="nome-sistema">Remover</th>
                                        <th scope="col" className="nome-sistema">Nome do Livro</th>
                                        <th scope="col" className="nome-sistema text-end">Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {livrosParaAlugar.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="text-center text-muted py-3">
                                                Nenhum livro adicionado ao aluguel.
                                            </td>
                                        </tr>
                                    ) : (
                                        livrosParaAlugar.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleRemoveLivro(item.id)}
                                                        title="Remover este livro"
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                                <td>{item.dsTitulo}</td>
                                                <td className="text-end">{formatarValorReais(item.vlAluguel)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan={2} className="text-end nome-sistema">Total:</th>
                                        <th className="text-end nome-sistema">{formatarValorReais(calcularTotal())}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};