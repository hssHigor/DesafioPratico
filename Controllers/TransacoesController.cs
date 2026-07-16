using ControleGastos.Api.DTOs.Transacao;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly TransacaoService _service;


    public TransacoesController(TransacaoService service)
    {
        _service = service;
    }


    [HttpPost]
    public async Task<IActionResult> Criar(TransacaoCreateDto dto)
    {
        try
        {
            var transacao = await _service.Criar(dto);

            return Created("", transacao);
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                mensagem = ex.Message
            });
        }
    }


    [HttpGet]
    public async Task<IActionResult> BuscarTodas()
    {
        var transacoes = await _service.BuscarTodas();

        return Ok(transacoes);
    }
}