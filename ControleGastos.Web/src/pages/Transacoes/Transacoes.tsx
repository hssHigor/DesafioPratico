import { useEffect, useState } from "react";
import { listarTransacoes, criarTransacao } from "../../services/transacaoService";
import { listarPessoas } from "../../services/pessoaService";

import type { Pessoa } from "../../types/Pessoa";
import type { Transacao } from "../../types/Transacao";
import type { TransacaoCreate } from "../../types/TransacaoCreate";

export function Transacoes() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number | "">("");
    const [tipo, setTipo] = useState(1);
    const [pessoaId, setPessoaId] = useState(0);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    async function carregarDados() {
    try {
        setCarregando(true);
        setErro("");

        const pessoasApi = await listarPessoas();
        const transacoesApi = await listarTransacoes();

        setPessoas(pessoasApi);
        setTransacoes(transacoesApi);
    } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar os dados.");
    } finally {
        setCarregando(false);
    }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    async function salvar() {
        const novaTransacao: TransacaoCreate = {
            descricao,
            valor: Number(valor),
            tipo,
            pessoaId
        };

        try {
            await criarTransacao(novaTransacao);

            setDescricao("");
            setValor("");
            setTipo(1);
            setPessoaId(0);

            carregarDados();
        } catch (error) {
            console.error(error);
            alert("Não foi possível cadastrar a transação.");
        }
    }

    if (carregando) {
        return <p>Carregando transações...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    return (
        <>
            <h2>Transações</h2>

            <div>
                <input
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={valor}
                    onChange={(e) =>
                        setValor(
                            e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                        )
    }
/>

                <select
                    value={tipo}
                    onChange={(e) => setTipo(Number(e.target.value))}
                >
                    <option value={1}>Receita</option>
                    <option value={2}>Despesa</option>
                </select>

                <select
                    value={pessoaId}
                    onChange={(e) => setPessoaId(Number(e.target.value))}
                >
                    <option value={0}>Selecione</option>

                    {pessoas.map((pessoa) => (
                        <option
                            key={pessoa.id}
                            value={pessoa.id}
                        >
                            {pessoa.nome}
                        </option>
                    ))}
                </select>

                <button onClick={salvar}>
                    Salvar
                </button>
            </div>

            <hr />

            <ul>
                {transacoes.map((transacao) => (
                    <li key={transacao.id}>
                        {transacao.descricao} -
                        R$ {transacao.valor} -
                        {transacao.tipo === 1 ? "Receita" : "Despesa"}
                    </li>
                ))}
            </ul>
        </>
    );
}