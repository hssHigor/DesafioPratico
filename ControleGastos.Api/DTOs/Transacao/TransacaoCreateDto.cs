using System.ComponentModel.DataAnnotations;
using ControleGastos.Api.Models;

namespace ControleGastos.Api.DTOs.Transacao;

public class TransacaoCreateDto
{
    [Required(ErrorMessage = "Descrição é obrigatória")]
    [MaxLength(200)]
    public string Descricao { get; set; } = string.Empty;


    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero")]
    public decimal Valor { get; set; }


    [Required]
    public TipoTransacao Tipo { get; set; }


    [Required]
    public int PessoaId { get; set; }
}