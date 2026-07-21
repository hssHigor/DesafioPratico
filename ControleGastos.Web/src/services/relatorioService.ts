import api from "../api/api";

import type { RelatorioTotais } from "../types/RelatorioTotais";


// Encapsula a chamada para o endpoint de relatório consolidado.
export async function buscarRelatorio(): Promise<RelatorioTotais> {
    const response = await api.get("/Relatorio/totais");

    return response.data;
}