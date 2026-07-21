import { useEffect, useState } from "react";
import { buscarRelatorio } from "../../services/relatorioService";
import type { RelatorioTotais } from "../../types/RelatorioTotais";

import { formatarMoeda } from "../../utils/formatarMoeda";

export function Relatorio() {
    const [relatorio, setRelatorio] = useState<RelatorioTotais | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    async function carregarRelatorio() {
        try {
            setCarregando(true);
            setErro("");
            const dados = await buscarRelatorio();
            setRelatorio(dados);
        } catch (error) {
            console.error(error);
            setErro("Nao foi possivel carregar o relatorio.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        void carregarRelatorio();
    }, []);

    if (carregando) {
        return <div className="state-card">Carregando relatorio...</div>;
    }

    if (!relatorio) {
        return <div className="state-card">Nenhum relatorio encontrado.</div>;
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
                        <p className="eyebrow">Resumo</p>
                        <h2>Relatorio de totais</h2>
                    </div>
                </div>

                <div className="metric-grid">
                    <div className="metric-card">
                        <h4>Receitas</h4>
                        <p className="metric-value">{formatarMoeda(relatorio.totalGeralReceitas)}</p>
                    </div>
                    <div className="metric-card">
                        <h4>Despesas</h4>
                        <p className="metric-value">{formatarMoeda(relatorio.totalGeralDespesas)}</p>
                    </div>
                    <div className="metric-card">
                        <h4>Saldo geral</h4>
                        <p className="metric-value">{formatarMoeda(relatorio.saldoGeral)}</p>
                    </div>
                </div>
            </section>

            <section className="panel">
                <div className="panel-header">
                    <h3>Totais por pessoa</h3>
                </div>

                <div className="card-list">
                    {relatorio.pessoas.map((pessoa) => (
                        <div key={pessoa.pessoaId} className="list-card">
                            <div className="list-card-info">
                                <div className="avatar">{pessoa.nome.charAt(0).toUpperCase()}</div>
                                <div>
                                    <strong>{pessoa.nome}</strong>
                                    <p>Saldo: {formatarMoeda(pessoa.saldo)}</p>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                                <span className="tag tag-income">Receitas: {formatarMoeda(pessoa.totalReceitas)}</span>
                                <span className="tag tag-expense">Despesas: {formatarMoeda(pessoa.totalDespesas)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
