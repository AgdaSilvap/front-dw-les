import { useEffect, useState, type FormEvent } from "react";
import { enableBootstrapValidation } from "../utils/scripts";
import { AutorService } from "../services/autorService";


type Autor = {
  id: string;
  nome: string;
};

type Editora = {
  id: string;
  nome: string;
};

export const ListPublisherByAutor = () => {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [selectedAutorId, setSelectedAutorId] = useState<string>("");
  const [editoras, setEditoras] = useState<Editora[]>([]);

  useEffect(() => {
    enableBootstrapValidation();

    AutorService.getAll()
      .then(setAutores)
      .catch((err) => {
        console.error("Erro ao carregar autores:", err);
        alert("Erro ao carregar autores");
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    form.classList.add("was-validated");

    if (!selectedAutorId) {
      alert("Por favor, selecione um autor.");
      return;
    }

    try {
      const data = await AutorService.listaEditorasPorAutor(selectedAutorId);
      setEditoras(data);
    } catch (error) {
      console.error("Erro ao buscar editoras:", error);
      alert("Erro ao buscar editoras: " + error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          <h3 className="nome-sistema fw-bold">Editoras por Autor</h3>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="autor" className="form-label nome-sistema">
                Autor
              </label>
              <select
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
                    {autor.nome}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">O autor é obrigatório.</div>
            </div>
            <button type="submit" className="btn-form w-100 mt-4 fw-semibold">
              Buscar Editoras
            </button>
          </form>
        </div>

        <div className="col-6">
          <div className="card shadow-sm p-3 h-100">
            <h5 className="mb-3">Editoras encontradas:</h5>
            {editoras.length === 0 ? (
              <p className="text-muted">Nenhuma editora encontrada ou nenhuma busca realizada.</p>
            ) : (
              <ul className="list-group">
                {editoras.map((editora) => (
                  <li key={editora.id} className="list-group-item">
                    {editora.nome}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
