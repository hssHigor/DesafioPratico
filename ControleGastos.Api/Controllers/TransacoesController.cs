using ControleGastos.Api.DTOs.Transacao;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;
using ControleGastos.Api.Exceptions;

namespace ControleGastos.Api.Controllers;

/// <summary>
/// Controller responsável por registrar e listar transações financeiras ligadas a pessoas.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly TransacaoService _service;


    public TransacoesController(TransacaoService service)
    {
        _service = service;
    }


    // Cria uma nova transação após validar as regras de negócio.
    [HttpPost]
    public async Task<IActionResult> Criar(TransacaoCreateDto dto)
    {
        try
        {
            var transacao = await _service.Criar(dto);      

            return Created("", transacao);
        }
        catch (BusinessException ex)
        {
            return BadRequest(new
            {
                mensagem = ex.Message
            });
        }
    }


    // Retorna o histórico de transações para exibição no painel do frontend.
    [HttpGet]
    public async Task<IActionResult> BuscarTodas()
    {
        var transacoes = await _service.BuscarTodas();

        return Ok(transacoes);
    }
}