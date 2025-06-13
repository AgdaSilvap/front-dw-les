import { useEffect, useState } from 'react';
import { SalaService } from '../services/salaService';

interface Sala {
  id: string;
  ds_apelido: string;
  qt_capacidade: number;
  ic_refrigerada: number; 
}

export const SalasRefrigeradas = () => {
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const todasSalas = await SalaService.getAll();
        const refrigeradas = todasSalas.filter((s: Sala) => s.ic_refrigerada === 1);
        setSalas(refrigeradas);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      }
    };

    fetchSalas();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-4">Salas Refrigeradas</h3>

      {salas.length === 0 ? (
        <p>Nenhuma sala refrigerada encontrada.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Apelido</th>
              <th>Capacidade</th>
              <th>Refrigerada</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((sala) => (
              <tr key={sala.id}>
                <td>{sala.ds_apelido}</td>
                <td>{sala.qt_capacidade}</td>
                <td>{sala.ic_refrigerada === 1 ? 'Sim' : 'Não'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};