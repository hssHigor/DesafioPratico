using ControleGastos.Api.DTOs.Pessoa;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;


namespace ControleGastos.Api.Controllers;


/// <summary>
/// Controller responsável por expor os endpoints de cadastro, listagem e exclusão de pessoas.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{

    private readonly PessoaService _service;


    public PessoasController(PessoaService service)
    {
        _service = service;
    }



    // Recebe um novo cadastro de pessoa e retorna o recurso criado.
    [HttpPost]
    public async Task<IActionResult> Criar(PessoaCreateDto dto)
    {
        var pessoa = await _service.Criar(dto);

        return CreatedAtAction(
            nameof(BuscarTodas),
            pessoa
        );
    }



    // Retorna todas as pessoas cadastradas para consumo pelo frontend.
    [HttpGet]
    public async Task<IActionResult> BuscarTodas()
    {
        var pessoas = await _service.BuscarTodas();

        return Ok(pessoas);
    }



    // Remove uma pessoa pelo identificador, quando ela existir.
    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var excluiu = await _service.Excluir(id);


        if (!excluiu)
            return NotFound();


        return NoContent();
    }
}