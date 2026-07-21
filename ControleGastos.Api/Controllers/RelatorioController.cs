using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

/// <summary>
/// Controller responsável por fornecer um resumo financeiro consolidado para o frontend.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class RelatorioController : ControllerBase
{
    private readonly RelatorioService _service;


    public RelatorioController(RelatorioService service)
    {
        _service = service;
    }


    // Gera o relatório consolidado com receitas, despesas e saldo geral.
    [HttpGet("totais")]
    public async Task<IActionResult> BuscarTotais()
    {
        var relatorio = await _service.GerarRelatorio();

        return Ok(relatorio);
    }
}