using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models;

public class Transacao
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Descricao { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Valor { get; set; }

    public TipoTransacao Tipo { get; set; }

    // Chave estrangeira
    public int PessoaId { get; set; }

    // Navegação
    public Pessoa? Pessoa { get; set; }
}