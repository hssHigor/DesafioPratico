using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs.Relatorio;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

public class RelatorioService
{
    private readonly AppDbContext _context;


    public RelatorioService(AppDbContext context)
    {
        _context = context;
    }



    public async Task<RelatorioTotaisDto> GerarRelatorio()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();



        var pessoasTotais = pessoas.Select(pessoa =>
        {
            var receitas = pessoa.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Receita)
                .Sum(t => t.Valor);


            var despesas = pessoa.Transacoes
                .Where(t => t.Tipo == TipoTransacao.Despesa)
                .Sum(t => t.Valor);


            return new PessoaTotalDto
            {
                PessoaId = pessoa.Id,
                Nome = pessoa.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            };
        })
        .ToList();



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