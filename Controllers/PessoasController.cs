using ControleGastos.Api.DTOs.Pessoa;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;


namespace ControleGastos.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{

    private readonly PessoaService _service;


    public PessoasController(PessoaService service)
    {
        _service = service;
    }



    [HttpPost]
    public async Task<IActionResult> Criar(PessoaCreateDto dto)
    {
        var pessoa = await _service.Criar(dto);

        return CreatedAtAction(
            nameof(BuscarTodas),
            pessoa
        );
    }



    [HttpGet]
    public async Task<IActionResult> BuscarTodas()
    {
        var pessoas = await _service.BuscarTodas();

        return Ok(pessoas);
    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var excluiu = await _service.Excluir(id);


        if (!excluiu)
            return NotFound();


        return NoContent();
    }
}