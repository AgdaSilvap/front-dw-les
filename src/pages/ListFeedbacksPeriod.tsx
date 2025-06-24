import { useState, type FormEvent, type ChangeEvent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { FeedbackService } from '../services/feedbackService';


type FeedbackChartData = {
  mes: string;
  quantidade: number;
};

export const ListFeedbacksPeriod = () => {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [chartData, setChartData] = useState<FeedbackChartData[]>([]);

  const handleDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5);
    if (value.length > 10) value = value.slice(0, 10);
    return value;
  };

  const handleDataInicialChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataInicial(handleDateInput(e));
  };

  const handleDataFinalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataFinal(handleDateInput(e));
  };

  const formatarParaISO = (data: string): string => {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    form.classList.add('was-validated');

    if (!dataInicial || !dataFinal || dataInicial.length !== 10 || dataFinal.length !== 10) {
      alert('Preencha as datas corretamente no formato dd/mm/aaaa');
      return;
    }

    try {
      const inicioISO = formatarParaISO(dataInicial);
      const fimISO = formatarParaISO(dataFinal);

      const data = await FeedbackService.relatorioFeedbackPeriodo(inicioISO, fimISO);

      // --- Start of changes ---
      // Check if data is an array before attempting to map
      if (!Array.isArray(data)) {
        console.error('Dados recebidos não são um array:', data);
        alert('Erro: Os dados do feedback não estão no formato esperado.');
        setChartData([]); // Clear previous chart data if invalid data is received
        return;
      }
      // --- End of changes ---

      // Conversão do valor de quantidade para número
      const dadosConvertidos = data.map(d => ({
        mes: d.mes,
        quantidade: Number(d.quantidade)
      }));

      setChartData(dadosConvertidos);
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
      alert('Erro ao buscar feedbacks: ' + error);
    }

    form.classList.remove('was-validated');
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex align-items-start">
        {/* Formulário */}
        <div className="col-12 col-md-5">
          <h4 className="fw-bold mb-4">Relatório de Feedbacks</h4>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <p className="fw-medium">Selecione um período:</p>

            <div className="mb-3">
              <label htmlFor="dataInicial" className="form-label">Data inicial:</label>
              <input
                type="text"
                id="dataInicial"
                className="form-control"
                placeholder="dd/mm/aaaa"
                value={dataInicial}
                onInput={handleDataInicialChange}
                minLength={10}
                maxLength={10}
                required
              />
              <div className="invalid-feedback">Informe a data no formato correto.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="dataFinal" className="form-label">Data final:</label>
              <input
                type="text"
                id="dataFinal"
                className="form-control"
                placeholder="dd/mm/aaaa"
                value={dataFinal}
                onInput={handleDataFinalChange}
                minLength={10}
                maxLength={10}
                required
              />
              <div className="invalid-feedback">Informe a data no formato correto.</div>
            </div>

            <button type="submit" className="btn btn-form w-100 mt-3 fw-semibold">
              Gerar relatório
            </button>
          </form>
        </div>

        {/* Gráfico */}
        <div className="col-12 col-md-7 mt-4 d-flex flex-column align-items-center justify-content-center">
          <h6 className="fw-semibold text-center">Relatório de feedback por período</h6>

          <div className="w-100 d-flex justify-content-center align-items-center">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#e0d5c6" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div >
  );
};
