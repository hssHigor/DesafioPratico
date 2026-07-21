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
        setErro("Não foi possível carregar o relatório.");
    } finally {
        setCarregando(false);
    }
}


    useEffect(() => {
        carregarRelatorio();
    }, []);

    if (carregando) {
        return <p>Carregando relatório...</p>;
    }

    if (erro) {
        return <p>{erro}</p>;
    }

    if (!relatorio) {
        return <p>Nenhum relatório encontrado.</p>;
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

                        Receitas: {formatarMoeda(pessoa.totalReceitas)}
                        <br />

                        Despesas: {formatarMoeda(pessoa.totalDespesas)}
                        <br />

                        Saldo: {formatarMoeda(pessoa.saldo)}

                        <hr />
                    </li>
                ))}
            </ul>


            <h3>Total Geral</h3>

            <p>
                Receitas:
                {formatarMoeda(relatorio.totalGeralReceitas)}
            </p>

            <p>
                Despesas:
                {formatarMoeda(relatorio.totalGeralReceitas)}
            </p>

            <p>
                Saldo:
                {formatarMoeda(relatorio.saldoGeral)}
            </p>
        </>
    );
}