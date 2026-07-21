import { useEffect, useState } from "react";
import { listarTransacoes, criarTransacao } from "../../services/transacaoService";
import { listarPessoas } from "../../services/pessoaService";

import type { Pessoa } from "../../types/Pessoa";
import type { Transacao } from "../../types/Transacao";
import type { TransacaoCreate } from "../../types/TransacaoCreate";

import { formatarMoeda } from "../../utils/formatarMoeda";

// Componente responsável por cadastrar e listar receitas e despesas vinculadas a uma pessoa.
export function Transacoes() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number | "">("");
    const [tipo, setTipo] = useState(1);
    const [pessoaId, setPessoaId] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    // Carrega as pessoas cadastradas e o histórico de transações para preencher o formulário e a lista.
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
            setErro("Nao foi possivel carregar os dados.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        void carregarDados();
    }, []);

    async function salvar() {
        if (!descricao.trim() || valor === "" || valor <= 0 || pessoaId === 0) {
            setErro("Preencha todos os campos antes de salvar.");
            return;
        }

        const novaTransacao: TransacaoCreate = {
            descricao: descricao.trim(),
            valor: Number(valor),
            tipo,
            pessoaId
        };

        try {
            setSalvando(true);
            setErro("");
            await criarTransacao(novaTransacao);

            setDescricao("");
            setValor("");
            setTipo(1);
            setPessoaId(0);

            await carregarDados();
        } catch (error) {
            console.error(error);
            setErro("Nao foi possivel cadastrar a transacao.");
        } finally {
            setSalvando(false);
        }
    }

    if (carregando) {
        return <div className="state-card">Carregando transacoes...</div>;
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
                        <p className="eyebrow">Movimentacao</p>
                        <h2>Transacoes</h2>
                    </div>
                    <span className="pill">{transacoes.length} registradas</span>
                </div>

                <div className="form-grid">
                    <input
                        className="input-field"
                        placeholder="Descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <input
                        className="input-field"
                        type="number"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) =>
                            setValor(e.target.value === "" ? "" : Number(e.target.value))
                        }
                    />

                    <select className="select-field" value={tipo} onChange={(e) => setTipo(Number(e.target.value))}>
                        <option value={1}>Receita</option>
                        <option value={2}>Despesa</option>
                    </select>

                    <select className="select-field" value={pessoaId} onChange={(e) => setPessoaId(Number(e.target.value))}>
                        <option value={0}>Selecione a pessoa</option>
                        {pessoas.map((pessoa) => (
                            <option key={pessoa.id} value={pessoa.id}>
                                {pessoa.nome}
                            </option>
                        ))}
                    </select>

                    <button className="primary-btn" onClick={() => void salvar()} disabled={salvando}>
                        {salvando ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </section>

            <section className="panel">
                <div className="panel-header">
                    <h3>Historico</h3>
                </div>

                <div className="card-list">
                    {transacoes.map((transacao) => (
                        <div key={transacao.id} className="transaction-card">
                            <div className="transaction-info">
                                <div className="avatar">
                                    {transacao.tipo === 1 ? "+" : "-"}
                                </div>
                                <div>
                                    <strong>{transacao.descricao}</strong>
                                    <p>{transacao.tipo === 1 ? "Receita" : "Despesa"}</p>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                                <span className={`tag ${transacao.tipo === 1 ? "tag-income" : "tag-expense"}`}>
                                    {formatarMoeda(transacao.valor)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
