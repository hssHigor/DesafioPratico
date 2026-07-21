using ControleGastos.Api.Data;
using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Repositories;
using ControleGastos.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Configura a aplicação como uma API REST e habilita documentação Swagger.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Define o contexto do Entity Framework com SQLite para persistir pessoas e transações.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gastos.db"));

builder.Services.AddScoped<PessoaRepository>();
builder.Services.AddScoped<PessoaService>();

builder.Services.AddScoped<TransacaoRepository>();

builder.Services.AddScoped<TransacaoService>();

// Registra os serviços que implementam as regras de negócio do sistema.
builder.Services.AddScoped<RelatorioService>();

// Habilita o CORS para permitir que o frontend React se comunique com a API localmente.
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Garante que as migrations sejam aplicadas automaticamente ao iniciar a API.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}
app.UseCors("frontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();