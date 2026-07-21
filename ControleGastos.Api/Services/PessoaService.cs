using ControleGastos.Api.DTOs.Pessoa;
using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories;

namespace ControleGastos.Api.Services;

/// <summary>
/// Serviço responsável por aplicar as regras de cadastro e consulta de pessoas.
/// </summary>
public class PessoaService
{
    private readonly PessoaRepository _repository;


    public PessoaService(PessoaRepository repository)
    {
        _repository = repository;
    }


    // Cria uma entidade Pessoa a partir do DTO recebido e a persiste no banco.
    public async Task<PessoaResponseDto> Criar(PessoaCreateDto dto)
    {
        // Cria uma nova entidade Pessoa a partir dos dados recebidos pelo DTO.
        // O identificador é gerado automaticamento pelo banco de dados.
        var pessoa = new Pessoa
        {
            Nome = dto.Nome,
            Idade = dto.Idade
        };


        var pessoaCriada = await _repository.Criar(pessoa);


        return ConverterParaDto(pessoaCriada);
    }


    // Busca todas as pessoas cadastradas e converte os dados para o formato usado pela API.
    public async Task<List<PessoaResponseDto>> BuscarTodas()
    {
        var pessoas = await _repository.BuscarTodas();


        return pessoas
            .Select(ConverterParaDto)
            .ToList();
    }


    // Remove uma pessoa quando ela existe, respeitando o relacionamento com as transações.
    public async Task<bool> Excluir(int id)
    {
        var pessoa = await _repository.BuscarPorId(id);


        if (pessoa == null)
            return false;

        // A exclusão das transações vinculadas ocorre automaticamente
        // através do relacionamento configurado no Entity Framework
        // utilizando DeleteBehavior.Cascade.
        await _repository.Excluir(pessoa);

        return true;
    }



    private PessoaResponseDto ConverterParaDto(Pessoa pessoa)
    {
        return new PessoaResponseDto
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade
        };
    }
}