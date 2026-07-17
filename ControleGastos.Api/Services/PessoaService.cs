using ControleGastos.Api.DTOs.Pessoa;
using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories;

namespace ControleGastos.Api.Services;

public class PessoaService
{
    private readonly PessoaRepository _repository;


    public PessoaService(PessoaRepository repository)
    {
        _repository = repository;
    }


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


    public async Task<List<PessoaResponseDto>> BuscarTodas()
    {
        var pessoas = await _repository.BuscarTodas();


        return pessoas
            .Select(ConverterParaDto)
            .ToList();
    }


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