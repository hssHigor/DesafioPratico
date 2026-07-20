import api from "../api/api";
import type { Transacao } from "../types/Transacao";
import type { TransacaoCreate } from "../types/TransacaoCreate";

export async function listarTransacoes(): Promise<Transacao[]> {
    const response = await api.get("/Transacoes");
    return response.data;
}

export async function criarTransacao(
    transacao: TransacaoCreate
): Promise<void> {
    await api.post("/Transacoes", transacao);
}