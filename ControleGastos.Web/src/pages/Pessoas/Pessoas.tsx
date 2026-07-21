import { useEffect, useState } from "react";
import type { Pessoa } from "../../types/Pessoa";
import {
  listarPessoas,
  criarPessoa,
  excluirPessoa
} from "../../services/pessoaService";


function Pessoas() {

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");



  async function carregarPessoas() {
    try {
        setCarregando(true);
        setErro("");

        const dados = await listarPessoas();

        setPessoas(dados);
    } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar as pessoas.");
    } finally {
        setCarregando(false);
    }
}



  useEffect(() => {
    carregarPessoas();
  }, []);



  async function cadastrarPessoa() {

    await criarPessoa({
      nome,
      idade: Number(idade)
    });

    setNome("");
    setIdade("");

    carregarPessoas();
  }



  async function removerPessoa(id:number){

    await excluirPessoa(id);

    carregarPessoas();
  }

  if (carregando) {
    return <p>Carregando pessoas...</p>;
  }

  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div>

      <h1>Pessoas</h1>


      <input
        placeholder="Nome"
        value={nome}
        onChange={(e)=>setNome(e.target.value)}
      />


      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e)=>setIdade(e.target.value)}
      />


      <button onClick={cadastrarPessoa}>
        Cadastrar
      </button>


      <hr />


      <ul>

        {pessoas.map(pessoa => (

          <li key={pessoa.id}>

            {pessoa.nome} - {pessoa.idade} anos

            <button
              onClick={()=>removerPessoa(pessoa.id)}
            >
              Excluir
            </button>

          </li>

        ))}

      </ul>

    </div>
  );
}


export default Pessoas;