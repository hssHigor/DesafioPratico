using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs.Relatorio;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

/// <summary>
/// Serviço responsável por consolidar receitas, despesas e saldo em um relatório por pessoa e geral.
/// </summary>
public class RelatorioService
{
    private readonly AppDbContext _context;


    public RelatorioService(AppDbContext context)
    {
        _context = context;
    }



    // Agrupa as transações por pessoa e calcula os totais de receitas, despesas e saldo.
    public async Task<RelatorioTotaisDto> GerarRelatorio()
    {
        // Busca todas as pessoas junto com suas transações para permitir
        // o cálculo individual de receitas, despesas e saldo.
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();



        var pessoasTotais = pessoas.Select(pessoa =>
        {
            // Soma somente transações classificadas como receitas.
            var receitas = pessoa.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);

            // Soma somente transações classificadas como despesas.
            var despesas = pessoa.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);


            return new PessoaTotalDto
            {
                PessoaId = pessoa.Id,
                Nome = pessoa.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,

                // Saldo calculado conforme regra de negócio:
                // receitas acumuladas menos despesas acumuladas
                Saldo = receitas - despesas
            };
        })
        .ToList();


        // Consolida os valores de todas as pessoas cadastradas,
        // gerando o resumo financeiro geral do sistema.
        return new RelatorioTotaisDto
        {
            Pessoas = pessoasTotais,

            TotalGeralReceitas = pessoasTotais
                .Sum(p => p.TotalReceitas),

            TotalGeralDespesas = pessoasTotais
                .Sum(p => p.TotalDespesas),

            SaldoGeral = pessoasTotais
                .Sum(p => p.Saldo)
        };
    }
}