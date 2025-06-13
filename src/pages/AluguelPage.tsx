import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { enableBootstrapValidation } from "../utils/scripts";

type Cliente = { id: string; dsNome: string };
type Funcionario = { id: string; dsNome: string };
type Livro = { id: string; dsTitulo: string; vlAluguel: number };

type LivroAlugado = {
    id: string;
    livroId: string;
    dsTitulo: string;
    vlAluguel: number;
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

    useEffect(() => {
        enableBootstrapValidation();

        setClientes([
            { id: "c1", dsNome: "João Silva" },
            { id: "c2", dsNome: "Maria Souza" },
        ]);
        setFuncionarios([
            { id: "f1", dsNome: "Ana Paula" },
            { id: "f2", dsNome: "Carlos Eduardo" },
        ]);
        setLivrosDisponiveis([
            { id: "l1", dsTitulo: "O Senhor dos Anéis", vlAluguel: 25.50 },
            { id: "l2", dsTitulo: "A Casa Torta", vlAluguel: 18.00 },
            { id: "l3", dsTitulo: "Dom Casmurro", vlAluguel: 12.75 },
            { id: "l4", dsTitulo: "A Culpa é das Estrelas", vlAluguel: 20.00 },
        ]);
    }, []);

    useEffect(() => {
        if (selectedLivroId) {
            const livroSelecionado = livrosDisponiveis.find(l => l.id === selectedLivroId);
            if (livroSelecionado) {
                setValorInput(formatarValorReais(livroSelecionado.vlAluguel));
            }
        } else {
            setValorInput("R$ 0,00");
        }
    }, [selectedLivroId, livrosDisponiveis]);

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
    };

    const handleValorInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");

        const numero = parseInt(value || "0", 10);
        setValorInput(formatarValorReais(numero / 100));
    };

    const handleAddLivro = (e: FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget.closest('form') as HTMLFormElement;

        if (!selectedLivroId || desformatarValorReais(valorInput) <= 0) {
            form.classList.add('was-validated');
            return;
        }

        const livroSelecionado = livrosDisponiveis.find(l => l.id === selectedLivroId);

        if (livroSelecionado) {
            const novoItem: LivroAlugado = {
                id: Math.random().toString(36).substr(2, 9),
                livroId: livroSelecionado.id,
                dsTitulo: livroSelecionado.dsTitulo,
                vlAluguel: desformatarValorReais(valorInput),
            };

            setLivrosParaAlugar([...livrosParaAlugar, novoItem]);

            setSelectedLivroId("");
            setValorInput("R$ 0,00");
            form.classList.remove('was-validated');
        }
    };

    const handleRemoveLivro = (idParaRemover: string) => {
        setLivrosParaAlugar(livrosParaAlugar.filter(item => item.id !== idParaRemover));
    };

    const handleFinalizarAluguel = (e: FormEvent) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;

        form.classList.add('was-validated');

        if (!selectedClienteId || !selectedFuncionarioId || livrosParaAlugar.length === 0) {
            alert("Por favor, selecione um cliente, um funcionário e adicione pelo menos um livro antes de finalizar.");
            return;
        }

        console.log("------------------------------------");
        console.log("DETALHES DO ALUGUEL A SER FINALIZADO:");
        console.log("Cliente ID:", selectedClienteId);
        console.log("Funcionário ID:", selectedFuncionarioId);
        console.log("Livros Alugados:", livrosParaAlugar);
        console.log("Total Geral do Aluguel:", calcularTotal());
        console.log("------------------------------------");

        setSelectedClienteId("");
        setSelectedFuncionarioId("");
        setSelectedLivroId("");
        setValorInput("R$ 0,00");
        setLivrosParaAlugar([]);
        form.classList.remove('was-validated');
        alert("Aluguel finalizado (dados enviados para o console)!");
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
                        <form className="needs-validation" noValidate onSubmit={handleFinalizarAluguel}>
                            <div className="mb-3">
                                <label htmlFor="livro" className="form-label nome-sistema">
                                    Livro
                                </label>
                                <select
                                    name="livro"
                                    id="livro"
                                    className="form-select"
                                    required
                                    value={selectedLivroId}
                                    onChange={handleLivroChange}
                                >
                                    <option value="" disabled>
                                        Selecione um livro
                                    </option>
                                    {livrosDisponiveis.map((livro) => (
                                        <option key={livro.id} value={livro.id}>
                                            {livro.dsTitulo}
                                        </option>
                                    ))}
                                </select>
                                {/* <div className="invalid-feedback">O Livro é obrigatório.</div> */}
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
                                    required
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
                                        Seleccione um cliente
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