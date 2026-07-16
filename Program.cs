using ControleGastos.Api.Data;
using Microsoft.EntityFrameworkCore;
using ControleGastos.Api.Repositories;
using ControleGastos.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=gastos.db"));

builder.Services.AddScoped<PessoaRepository>();
builder.Services.AddScoped<PessoaService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();