using System.ComponentModel.DataAnnotations;

namespace ControleGastos.Api.Models;

public class Pessoa
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Range(0, 120)]
    public int Idade { get; set; }

    // Uma pessoa pode possuir várias transações
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}