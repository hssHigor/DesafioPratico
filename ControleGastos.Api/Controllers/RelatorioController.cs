using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RelatorioController : ControllerBase
{
    private readonly RelatorioService _service;


    public RelatorioController(RelatorioService service)
    {
        _service = service;
    }


    [HttpGet("totais")]
    public async Task<IActionResult> BuscarTotais()
    {
        var relatorio = await _service.GerarRelatorio();

        return Ok(relatorio);
    }
}