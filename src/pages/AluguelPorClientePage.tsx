import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { enableBootstrapValidation } from "../utils/scripts";
import { ClienteService } from "../services/clienteService";
import { AluguelService } from "../services/aluguelService";

type Cliente = { id: string; dsNome: string };

type ItemRelatorio = {
  "Data de Aluguel": string;
  "Nome do Livro": string;
};

export const RelatorioAluguelPorClientePage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedClienteId, setSelectedClienteId] = useState<string>("");
  const [dataInicialInput, setDataInicialInput] = useState<string>("");
  const [dataFinalInput, setDataFinalInput] = useState<string>("");
  const [itensRelatorio, setItensRelatorio] = useState<ItemRelatorio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatDateForApi = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

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

  useEffect(() => {
    enableBootstrapValidation();

    const fetchClientes = async () => {
      try {
        setError(null);
        setLoading(true);
        const fetchedClientes: Cliente[] = await ClienteService.getAll();
        setClientes(fetchedClientes);
      } catch (err) {
        console.error("Erro ao carregar clientes:", err);
        setError("Erro ao carregar clientes. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleGerarRelatorio = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    form.classList.add("was-validated");

    if (
      !selectedClienteId ||
      !dataInicialInput ||
      dataInicialInput.length !== 10 ||
      !dataFinalInput ||
      dataFinalInput.length !== 10
    ) {
      alert(
        "Por favor, selecione um cliente e informe as datas inicial e final corretamente (dd/mm/aaaa)."
      );
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const dataInicioApi = formatDateForApi(dataInicialInput);
      const dataFimApi = formatDateForApi(dataFinalInput);

      const reportData: ItemRelatorio[] =
        await AluguelService.getLivrosAlugadosPorClienteNoPeriodo(
          selectedClienteId,
          dataInicioApi,
          dataFimApi
        );

      setItensRelatorio(reportData);
      form.classList.remove("was-validated");
    } catch (err) {
      console.error("Erro ao gerar relatório:", err);
      setError(
        "Erro ao gerar relatório. Verifique os dados e tente novamente."
      );
      setItensRelatorio([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            <h3 className="nome-sistema fw-bold">
              Relatório de Aluguel de Livros por Cliente
            </h3>
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleGerarRelatorio}
            >
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
                  disabled={loading}
                >
                  <option value="" disabled>
                    {loading ? "Carregando clientes..." : "Selecione o Cliente"}
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
                <label htmlFor="dataInicial" className="form-label nome-sistema">
                  Data inicial:
                </label>
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
                  disabled={loading}
                />
                <div className="invalid-feedback">
                  A data inicial é obrigatória e deve estar no formato
                  dd/mm/aaaa.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="dataFinal" className="form-label nome-sistema">
                  Data final:
                </label>
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
                  disabled={loading}
                />
                <div className="invalid-feedback">
                  A data final é obrigatória e deve estar no formato dd/mm/aaaa.
                </div>
              </div>

              <button
                type="submit"
                className="btn-form w-100 mt-5 fw-semibold"
                disabled={loading}
              >
                {loading ? "Gerando..." : "Gerar relatório"}
              </button>
            </form>
          </div>

          <div className="col-12 col-md-6 mt-4">
            <div className="card shadow-sm p-3 h-100">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {loading && !error && (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              )}
              {!loading && !error && (
                <table className="table table-striped mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="nome-sistema">
                        Data
                      </th>
                      <th scope="col" className="nome-sistema">
                        Nome do Livro
                      </th>
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
                          <td>{item["Data de Aluguel"]}</td>
                          <td>{item["Nome do Livro"]}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};