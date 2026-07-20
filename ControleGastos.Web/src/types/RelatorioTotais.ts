import type { PessoaTotal } from "./PessoaTotal";

export interface RelatorioTotais {
    pessoas: PessoaTotal[];
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoGeral: number;
}