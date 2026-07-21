# Controle de Gastos

Sistema desenvolvido como desafio técnico para gerenciamento de pessoas, transações financeiras e geração de relatórios consolidados.

## 📋 Sobre o projeto

A aplicação permite:

- Cadastrar pessoas;
- Registrar receitas e despesas vinculadas a uma pessoa;
- Consultar um relatório consolidado contendo receitas, despesas e saldo geral, além dos totais por pessoa.

O projeto foi desenvolvido utilizando uma arquitetura em camadas no backend e uma aplicação React no frontend.

---

# 🚀 Tecnologias utilizadas

## Backend

- .NET 9
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger / OpenAPI

## Frontend

- React
- TypeScript
- Vite
- CSS

---

# 📁 Estrutura do projeto

```text
DesafioTecnico/
│
├── README.md
│
├── ControleGastos.Api/
│   ├── Controllers/
│   ├── Data/
│   ├── DTOs/
│   ├── Exceptions/
│   ├── Migrations/
│   ├── Models/
│   ├── Repositories/
│   ├── Services/
│   └── Program.cs
│
└── ControleGastos.Web/
    ├── src/
    │   ├── pages/
    │   ├── services/
    │   ├── types/
    │   ├── utils/
    │   └── App.tsx
    └── package.json
```

---

# 🏗 Arquitetura

## Backend

O backend foi organizado seguindo a separação de responsabilidades:

- **Controllers** → recebem as requisições HTTP;
- **Services** → concentram as regras de negócio;
- **Repositories** → realizam o acesso ao banco de dados;
- **Entity Framework Core** → responsável pela persistência dos dados utilizando SQLite.

## Frontend

O frontend foi organizado em:

- **Pages** → telas da aplicação;
- **Services** → comunicação com a API;
- **Types** → interfaces TypeScript;
- **Utils** → funções auxiliares, como a formatação de moeda.

---

# 🧠 Lógica e fluxo do projeto

A aplicação foi pensada para representar um fluxo simples de controle financeiro:

1. O usuário cadastra pessoas no sistema;
2. Em seguida, registra receitas ou despesas associadas a uma dessas pessoas;
3. O backend calcula os totais por pessoa e o resumo geral;
4. O frontend exibe esses resultados em uma interface organizada.

A estrutura foi dividida em camadas para deixar a lógica clara:
- o backend concentra as regras de negócio nos services;
- os repositories cuidam da persistência no banco SQLite;
- o frontend consome a API e apresenta os dados com feedback visual.

Essa organização foi adotada para facilitar manutenção, entendimento e avaliação do desafio técnico.

---

# ✅ Funcionalidades

## Pessoas

- Cadastro de pessoas;
- Listagem de pessoas;
- Exclusão de pessoas.

## Transações

- Cadastro de receitas;
- Cadastro de despesas;
- Associação da transação a uma pessoa cadastrada;
- Listagem das transações;
- Formatação dos valores em Real (R$).

## Relatório

- Total geral de receitas;
- Total geral de despesas;
- Saldo geral;
- Totais individuais por pessoa.

---

# 💾 Banco de dados

O projeto utiliza **SQLite** com **Entity Framework Core Migrations**.

O arquivo `gastos.db` não é versionado, pois contém apenas dados utilizados durante o desenvolvimento.

Ao executar a API pela primeira vez, o Entity Framework Core aplica automaticamente as migrations existentes, criando o banco de dados e sua estrutura caso ainda não existam.

---

# ▶️ Como executar

## Pré-requisitos

- .NET SDK 9
- Node.js (versão 20 ou superior)
- npm

---

## 1. Clonar o repositório

```bash
git clone https://github.com/hssHigor/DesafioPratico.git
```

Entre na pasta do projeto:

```bash
cd DesafioPratico
```

---

## 2. Executar o Backend

Entre na pasta da API:

```bash
cd ControleGastos.Api
```

Restaure as dependências:

```bash
dotnet restore
```

Execute a aplicação:

```bash
dotnet run
```

Ao iniciar, o Entity Framework Core criará automaticamente o banco de dados SQLite e aplicará as migrations, caso o banco ainda não exista.

O Swagger poderá ser acessado pelo endereço informado no terminal após a inicialização da aplicação, normalmente em:

```
https://localhost:<porta>/swagger
```

---

## 3. Executar o Frontend

Abra um novo terminal.

Entre na pasta do frontend:

```bash
cd ControleGastos.Web
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço onde a aplicação estará disponível, normalmente:

```
http://localhost:5173
```

---

# 📌 Fluxo de utilização

1. Cadastre uma pessoa;
2. Cadastre receitas e/ou despesas vinculadas à pessoa;
3. Consulte o relatório para visualizar os totais e o saldo consolidado.

---

# ✨ Melhorias implementadas

- Interface modernizada e mais intuitiva;
- Navegação por abas;
- Organização em componentes;
- Formatação monetária em Real (R$);
- Tratamento de erros no frontend;
- Arquitetura em camadas no backend;
- Criação automática do banco de dados através das Migrations do Entity Framework Core.

---

# 👨‍💻 Autor

**Higor Santos da Silva**