# Controle de Gastos Residenciais API

API desenvolvida para gerenciamento de gastos residenciais, permitindo o cadastro de pessoas, cadastro de transações financeiras e consulta de totais.

Projeto desenvolvido como parte de um desafio técnico utilizando .NET e C# no back-end.

---

# Tecnologias utilizadas

- .NET 9
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger / OpenAPI

---

# Funcionalidades

## Cadastro de pessoas

Permite o gerenciamento de pessoas através das operações:

- Criar pessoa;
- Listar pessoas;
- Excluir pessoa.

Dados cadastrados:

- Identificador único gerado automaticamente;
- Nome;
- Idade.

---

## Cadastro de transações

Permite o gerenciamento de transações financeiras:

- Criar transação;
- Listar transações.

Dados cadastrados:

- Identificador único gerado automaticamente;
- Descrição;
- Valor;
- Tipo (Receita ou Despesa);
- Pessoa relacionada.

---

# Regras de negócio implementadas

## Validação de pessoa

Toda transação deve estar vinculada a uma pessoa existente no cadastro.

Caso o identificador informado não exista, a transação não é criada.

---

## Restrição para menores de idade

Pessoas menores de 18 anos podem cadastrar apenas despesas.

Exemplo:

Pessoa:

```
Nome: João
Idade: 15 anos
```

Permitido:

```
Descrição: Cinema
Tipo: Despesa
Valor: 50
```

Não permitido:

```
Descrição: Salário
Tipo: Receita
Valor: 1000
```

---

## Exclusão em cascata

Ao excluir uma pessoa, todas as transações associadas a ela também são removidas.

Essa regra é implementada através do relacionamento entre as entidades utilizando Entity Framework Core com exclusão em cascata.

---

# Consulta de totais

A API disponibiliza um relatório financeiro contendo:

- Total de receitas por pessoa;
- Total de despesas por pessoa;
- Saldo individual;
- Total geral de receitas;
- Total geral de despesas;
- Saldo líquido geral.

O cálculo do saldo segue a regra:

```
Saldo = Receita - Despesa
```

---

# Arquitetura do projeto

O projeto foi organizado seguindo uma separação de responsabilidades:

```
ControleGastos.Api

├── Controllers
│   ├── PessoasController.cs
│   ├── TransacoesController.cs
│   └── RelatorioController.cs
│
├── DTOs
│
├── Models
│
├── Services
│
├── Repositories
│
├── Data
│   └── AppDbContext.cs
│
├── Exceptions
│
└── Program.cs
```

---

# Persistência dos dados

Os dados são armazenados utilizando SQLite através do Entity Framework Core.

As informações permanecem persistidas mesmo após o encerramento da aplicação.

---

# Como executar o projeto

## Pré-requisitos

É necessário possuir instalado:

- .NET SDK 9

Verificar instalação:

```bash
dotnet --version
```

---

## Clonar o projeto

```bash
git clone https://github.com/hssHigor/DesafioPratico.git
```

Acessar a pasta:

```bash
cd ControleGastos.Api
```

---

## Restaurar dependências

```bash
dotnet restore
```

---

## Executar aplicação

```bash
dotnet run
```

Após executar o comando, a API será iniciada no endereço informado pelo terminal.

Exemplo:

```
Now listening on: http://localhost:5092
```
Esse endereço deverá ser utilizado para acessar a API e o Swagger

---

# Swagger

Após iniciar a aplicação, a documentação dos endpoints estará disponível através do Swagger:

```
http://localhost:<porta-da-aplicacao>/swagger
```
A porta utilizada pode variar conforme a configuração do ambiente
---

# Endpoints disponíveis

## Pessoas

### Criar pessoa

```
POST /api/Pessoas
```

Exemplo:

```json
{
  "nome": "Carlos",
  "idade": 30
}
```

---

### Listar pessoas

```
GET /api/Pessoas
```

---

### Excluir pessoa

```
DELETE /api/Pessoas/{id}
```

---

# Transações

### Criar transação

```
POST /api/Transacoes
```

Exemplo:

```json
{
  "descricao": "Salário",
  "valor": 3000,
  "tipo": 1,
  "pessoaId": 2
}
```

Valores do campo tipo:

```
1 - Receita
2 - Despesa
```

---

### Listar transações

```
GET /api/Transacoes
```

---

# Relatório

### Consultar totais

```
GET /api/Relatorio/totais
```

Exemplo de retorno:

```json
{
  "pessoas": [
    {
      "pessoaId": 1,
      "nome": "Carlos",
      "totalReceitas": 3000,
      "totalDespesas": 500,
      "saldo": 2500
    }
  ],
  "totalGeralReceitas": 3000,
  "totalGeralDespesas": 500,
  "saldoGeral": 2500
}
```

---

# Tratamento de erros

O projeto possui tratamento de exceções para regras de negócio utilizando exceções personalizadas.

Exemplos:

- Pessoa não encontrada;
- Tentativa de cadastrar receita para menor de idade;
- Operações inválidas.

---

# Considerações finais

O objetivo da aplicação é demonstrar uma API organizada seguindo boas práticas de desenvolvimento, separação de responsabilidades e implementação de regras de negócio utilizando .NET e C#.

---

# Autor

Higor Santos