import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { enableBootstrapValidation } from "../utils/scripts";

type Autor = { id: string; dsNome: string };

type ItemRelatorio = {
    dtAluguel: string;
    dsTituloLivro: string;
};

export const RelatorioAluguelPorAutorPage = () => {
    const [autores, setAutores] = useState<Autor[]>([]);

    const [selectedAutorId, setSelectedAutorId] = useState<string>("");
    const [dataInicialInput, setDataInicialInput] = useState<string>("");
    const [dataFinalInput, setDataFinalInput] = useState<string>("");

    const [itensRelatorio, setItensRelatorio] = useState<ItemRelatorio[]>([]);

    useEffect(() => {
        enableBootstrapValidation();

        setAutores([
            { id: "a1", dsNome: "Machado de Assis" },
            { id: "a2", dsNome: "Clarice Lispector" },
            { id: "a3", dsNome: "Monteiro Lobato" },
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

        if (!selectedAutorId || !dataInicialInput || dataInicialInput.length !== 10 || !dataFinalInput || dataFinalInput.length !== 10) {
            alert("Por favor, selecione um autor e informe as datas inicial e final corretamente (dd/mm/aaaa).");
            return;
        }

        console.log("Gerando relatório para:");
        console.log("Autor ID:", selectedAutorId);
        console.log("Data Inicial:", dataInicialInput);
        console.log("Data Final:", dataFinalInput);

        const mockReportData: ItemRelatorio[] = [
            { dtAluguel: "05/03/2024", dsTituloLivro: "O Alienista" },
            { dtAluguel: "12/03/2024", dsTituloLivro: "Memórias Póstumas de Brás Cubas" },
            { dtAluguel: "20/04/2024", dsTituloLivro: "A Hora da Estrela" },
            { dtAluguel: "25/04/2024", dsTituloLivro: "Sítio do Picapau Amarelo" },
        ];
        setItensRelatorio(mockReportData);

        form.classList.remove('was-validated');
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <h3 className="nome-sistema fw-bold">Relatório de Aluguel de Livros por Autor</h3>
                        <form className="needs-validation" noValidate onSubmit={handleGerarRelatorio}>
                            <div className="mb-3">
                                <label htmlFor="autor" className="form-label nome-sistema">
                                    Autor
                                </label>
                                <select
                                    name="autor"
                                    id="autor"
                                    className="form-select"
                                    required
                                    value={selectedAutorId}
                                    onChange={(e) => setSelectedAutorId(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Selecione o Autor
                                    </option>
                                    {autores.map((autor) => (
                                        <option key={autor.id} value={autor.id}>
                                            {autor.dsNome}
                                        </option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">O autor é obrigatório.</div>
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
                                                <td>{item.dsTituloLivro}</td>
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