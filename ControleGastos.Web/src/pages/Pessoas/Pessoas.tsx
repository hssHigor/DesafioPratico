import { useEffect, useState } from "react";
import type { Pessoa } from "../../types/Pessoa";
import { listarPessoas, criarPessoa, excluirPessoa } from "../../services/pessoaService";

// Componente responsável por cadastrar, listar e remover pessoas no painel.
function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  // Busca os dados no backend e atualiza a lista exibida na tela.
  async function carregarPessoas() {
    try {
      setCarregando(true);
      setErro("");
      const dados = await listarPessoas();
      setPessoas(dados);
    } catch (error) {
      console.error(error);
      setErro("Nao foi possivel carregar as pessoas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarPessoas();
  }, []);

  async function cadastrarPessoa() {
    if (!nome.trim() || !idade) {
      setErro("Informe nome e idade para cadastrar.");
      return;
    }

    try {
      setSalvando(true);
      setErro("");
      await criarPessoa({ nome: nome.trim(), idade: Number(idade) });
      setNome("");
      setIdade("");
      await carregarPessoas();
    } catch (error) {
      console.error(error);
      setErro("Nao foi possivel cadastrar a pessoa.");
    } finally {
      setSalvando(false);
    }
  }

  async function removerPessoa(id: number) {
    try {
      await excluirPessoa(id);
      await carregarPessoas();
    } catch (error) {
      console.error(error);
      setErro("Nao foi possivel remover a pessoa.");
    }
  }

  if (carregando) {
    return <div className="state-card">Carregando pessoas...</div>;
  }

  return (
    <div className="page-section">
      {erro && (
        <div className="state-card">
          {erro}
        </div>
      )}

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Cadastro</p>
            <h2>Pessoas</h2>
          </div>
          <span className="pill">{pessoas.length} cadastradas</span>
        </div>

        <div className="form-grid">
          <input
            className="input-field"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            className="input-field"
            type="number"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />

          <button className="primary-btn" onClick={cadastrarPessoa} disabled={salvando}>
            {salvando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Lista de participantes</h3>
        </div>

        <div className="card-list">
          {pessoas.map((pessoa) => (
            <div key={pessoa.id} className="list-card">
              <div className="list-card-info">
                <div className="avatar">{pessoa.nome.charAt(0).toUpperCase()}</div>
                <div>
                  <strong>{pessoa.nome}</strong>
                  <p>{pessoa.idade} anos</p>
                </div>
              </div>

              <button className="secondary-btn" onClick={() => void removerPessoa(pessoa.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Pessoas;
