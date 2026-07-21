using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Repositories;

/// <summary>
/// Repositório responsável pela persistência das transações financeiras.
/// </summary>
public class TransacaoRepository
{
    private readonly AppDbContext _context;


    public TransacaoRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<Transacao> Criar(Transacao transacao)
    {
        _context.Transacoes.Add(transacao);

        await _context.SaveChangesAsync();

        return transacao;
    }


    public async Task<List<Transacao>> BuscarTodas()
    {
        return await _context.Transacoes
            .Include(t => t.Pessoa)
            .ToListAsync();
    }
}