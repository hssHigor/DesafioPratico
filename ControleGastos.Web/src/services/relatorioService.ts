import api from "../api/api";

import type { RelatorioTotais } from "../types/RelatorioTotais";


export async function buscarRelatorio(): Promise<RelatorioTotais> {
    const response = await api.get("/Relatorio/totais");

    return response.data;
}