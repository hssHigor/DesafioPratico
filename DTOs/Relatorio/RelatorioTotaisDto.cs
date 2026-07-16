namespace ControleGastos.Api.DTOs.Relatorio;

public class RelatorioTotaisDto
{
    public List<PessoaTotalDto> Pessoas { get; set; } = new();

    public decimal TotalGeralReceitas { get; set; }

    public decimal TotalGeralDespesas { get; set; }

    public decimal SaldoGeral { get; set; }
}