using ControleGastos.Api.DTOs.Transacao;
using ControleGastos.Api.Models;
using ControleGastos.Api.Repositories;
using ControleGastos.Api.Exceptions;

namespace ControleGastos.Api.Services;

public class TransacaoService
{
    private readonly TransacaoRepository _transacaoRepository;
    private readonly PessoaRepository _pessoaRepository;


    public TransacaoService(
        TransacaoRepository transacaoRepository,
        PessoaRepository pessoaRepository)
    {
        _transacaoRepository = transacaoRepository;
        _pessoaRepository = pessoaRepository;
    }


    public async Task<TransacaoResponseDto> Criar(TransacaoCreateDto dto)
    {
        // Valida se a pessoa informada na transação está cadastrada.
        // O sistema não permite criar transações vinculadas a pessoas inexistentes.
        var pessoa = await _pessoaRepository.BuscarPorId(dto.PessoaId);


        if (pessoa == null)
        {
            throw new BusinessException(
                "Pessoa não encontrada."
            );
        }


        // Regra de negócio:
        // Pessoas menores de 18 anos só podem cadastrar despesas
        // O sistema bloqueia receitas para evitar que menores sejam
        // cadastrados como responsáveis por entradas financeiras.
        if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
        {
            throw new BusinessException(
                "Menores de idade não podem cadastrar receitas."
            );
        }

        // Cria a entidade Transacao após todas as validações
        // de regra de negócio serem aprovadas.
        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId
        };


        var transacaoCriada = await _transacaoRepository.Criar(transacao);


        return ConverterParaDto(transacaoCriada);
    }



    public async Task<List<TransacaoResponseDto>> BuscarTodas()
    {
        var transacoes = await _transacaoRepository.BuscarTodas();


        return transacoes
            .Select(ConverterParaDto)
            .ToList();
    }



    private TransacaoResponseDto ConverterParaDto(Transacao transacao)
    {
        return new TransacaoResponseDto
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Tipo = transacao.Tipo,
            PessoaId = transacao.PessoaId
        };
    }
}