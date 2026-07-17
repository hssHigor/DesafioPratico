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



  async function carregarPessoas() {
    const dados = await listarPessoas();

    setPessoas(dados);
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