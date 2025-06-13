import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { enableBootstrapValidation } from "../utils/scripts";

type Cliente = { id: string; dsNome: string };

type ItemRelatorio = {
    dtAluguel: string;
    dsTitulo: string;
};

export const RelatorioAluguelPorClientePage = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const [selectedClienteId, setSelectedClienteId] = useState<string>("");
    const [dataInicialInput, setDataInicialInput] = useState<string>("");
    const [dataFinalInput, setDataFinalInput] = useState<string>("");

    const [itensRelatorio, setItensRelatorio] = useState<ItemRelatorio[]>([]);

    useEffect(() => {
        enableBootstrapValidation();

        setClientes([
            { id: "c1", dsNome: "João Silva" },
            { id: "c2", dsNome: "Maria Souza" },
            { id: "c3", dsNome: "Pedro Álvares" },
        ]);
    }, []);

    const handleDateInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");

        if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5);
        if (value.length > 10) value = value.slice(0, 10);

        return value;
    };

    const handleDataInicialChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDataInicialInput(handleDateInput(e));
    };

    const handleDataFinalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDataFinalInput(handleDateInput(e));
    };

    const handleGerarRelatorio = (e: FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        form.classList.add('was-validated');

        if (!selectedClienteId || !dataInicialInput || dataInicialInput.length !== 10 || !dataFinalInput || dataFinalInput.length !== 10) {
            alert("Por favor, selecione um cliente e informe as datas inicial e final corretamente (dd/mm/aaaa).");
            return;
        }

        console.log("Gerando relatório para:");
        console.log("Cliente ID:", selectedClienteId);
        console.log("Data Inicial:", dataInicialInput);
        console.log("Data Final:", dataFinalInput);

        const mockReportData: ItemRelatorio[] = [
            { dtAluguel: "01/05/2024", dsTitulo: "O Pequeno Príncipe" },
            { dtAluguel: "10/05/2024", dsTitulo: "1984" },
            { dtAluguel: "15/05/2024", dsTitulo: "Dom Casmurro" },
            { dtAluguel: "20/05/2024", dsTitulo: "O Senhor dos Anéis" },
        ];
        setItensRelatorio(mockReportData);

        form.classList.remove('was-validated');
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <h3 className="nome-sistema fw-bold">Relatório de Aluguel de Livros por Cliente</h3>
                        <form className="needs-validation" noValidate onSubmit={handleGerarRelatorio}>
                            <div className="mb-3">
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
                                        Selecione o Cliente
                                    </option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.dsNome}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">O cliente é obrigatório.</div>
                            </div>

                            <p className="nome-sistema mt-4">Selecione um período:</p>

                            <div className="mb-3">
                                <label htmlFor="dataInicial" className="form-label nome-sistema">Data inicial:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dataInicial"
                                    placeholder="dd/mm/aaaa"
                                    minLength={10}
                                    maxLength={10}
                                    value={dataInicialInput}
                                    onInput={handleDataInicialChange}
                                    required
                                />
                                <div className="invalid-feedback">A data inicial é obrigatória e deve estar no formato dd/mm/aaaa.</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dataFinal" className="form-label nome-sistema">Data final:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dataFinal"
                                    placeholder="dd/mm/aaaa"
                                    minLength={10}
                                    maxLength={10}
                                    value={dataFinalInput}
                                    onInput={handleDataFinalChange}
                                    required
                                />
                                <div className="invalid-feedback">A data final é obrigatória e deve estar no formato dd/mm/aaaa.</div>
                            </div>

                            <button type="submit" className="btn-form w-100 mt-5 fw-semibold">
                                Gerar relatório
                            </button>
                        </form>
                    </div>

                    <div className="col-6">
                        <div className="card shadow-sm p-3 h-100">
                            <table className="table table-striped mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="nome-sistema">Data</th>
                                        <th scope="col" className="nome-sistema">Nome do Livro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itensRelatorio.length === 0 ? (
                                        <tr>
                                            <td colSpan={2} className="text-center text-muted py-3">
                                                Nenhum relatório gerado ou dados não encontrados.
                                            </td>
                                        </tr>
                                    ) : (
                                        itensRelatorio.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.dtAluguel}</td>
                                                <td>{item.dsTitulo}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};