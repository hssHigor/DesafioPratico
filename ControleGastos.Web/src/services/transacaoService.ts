import api from "../api/api";
import type { Transacao } from "../types/Transacao";
import type { TransacaoCreate } from "../types/TransacaoCreate";

// Encapsula as chamadas para os endpoints de transações no backend.
export async function listarTransacoes(): Promise<Transacao[]> {
    const response = await api.get("/Transacoes");
    return response.data;
}

export async function criarTransacao(
    transacao: TransacaoCreate
): Promise<void> {
    await api.post("/Transacoes", transacao);
}