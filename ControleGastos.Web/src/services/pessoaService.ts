import api from "../api/api";
import type { Pessoa } from "../types/Pessoa";


export const listarPessoas = async (): Promise<Pessoa[]> => {
  const response = await api.get<Pessoa[]>("/Pessoas");

  return response.data;
};



export const criarPessoa = async (
  pessoa: Omit<Pessoa, "id">
): Promise<Pessoa> => {

  const response = await api.post<Pessoa>(
    "/Pessoas",
    pessoa
  );

  return response.data;
};



export const excluirPessoa = async (
  id: number
): Promise<void> => {

  await api.delete(`/Pessoas/${id}`);

};