using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Repositories;

public class PessoaRepository
{
    private readonly AppDbContext _context;

    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<List<Pessoa>> BuscarTodas()
    {
        return await _context.Pessoas.ToListAsync();
    }


    public async Task<Pessoa?> BuscarPorId(int id)
    {
        return await _context.Pessoas
            .FirstOrDefaultAsync(p => p.Id == id);
    }


    public async Task<Pessoa> Criar(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);

        await _context.SaveChangesAsync();

        return pessoa;
    }


    public async Task Excluir(Pessoa pessoa)
    {
        _context.Pessoas.Remove(pessoa);

        await _context.SaveChangesAsync();
    }
}