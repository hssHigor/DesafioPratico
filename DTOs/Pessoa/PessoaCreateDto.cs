using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.DTOs.Pessoa;

public class PessoaCreateDto
{
    [Required(ErrorMessage = "Nome é obrigatório")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Range(0, 120, ErrorMessage = "Idade inválida")]
    public int Idade { get; set; }
}