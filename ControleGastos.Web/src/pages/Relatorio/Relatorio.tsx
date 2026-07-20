import { useEffect, useState } from "react";

import { buscarRelatorio } from "../../services/relatorioService";

import type { RelatorioTotais } from "../../types/RelatorioTotais";


export function Relatorio() {

    const [relatorio, setRelatorio] = useState<RelatorioTotais | null>(null);


    async function carregarRelatorio() {
        const dados = await buscarRelatorio();

        setRelatorio(dados);
    }


    useEffect(() => {
        carregarRelatorio();
    }, []);


    if (!relatorio) {
        return <p>Carregando relatório...</p>;
    }


    return (
        <>
            <h2>Relatório de Totais</h2>


            <h3>Totais por pessoa</h3>

            <ul>
                {relatorio.pessoas.map((pessoa) => (
                    <li key={pessoa.pessoaId}>
                        <strong>{pessoa.nome}</strong>
                        <br />

                        Receitas: R$ {pessoa.totalReceitas}
                        <br />

                        Despesas: R$ {pessoa.totalDespesas}
                        <br />

                        Saldo: R$ {pessoa.saldo}

                        <hr />
                    </li>
                ))}
            </ul>


            <h3>Total Geral</h3>

            <p>
                Receitas:
                R$ {relatorio.totalGeralReceitas}
            </p>

            <p>
                Despesas:
                R$ {relatorio.totalGeralDespesas}
            </p>

            <p>
                Saldo:
                R$ {relatorio.saldoGeral}
            </p>
        </>
    );
}