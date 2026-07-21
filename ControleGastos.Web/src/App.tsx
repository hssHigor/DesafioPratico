import { useState } from "react";

import Pessoas from "./pages/Pessoas/Pessoas";
import { Transacoes } from "./pages/Transacoes/Transacoes";
import { Relatorio } from "./pages/Relatorio/Relatorio";

// Componente principal que controla a navegação entre as telas do painel financeiro.
function App() {
    const [pagina, setPagina] = useState("pessoas");

    const abas = [
        { key: "pessoas", label: "Pessoas", descricao: "Gerencie os participantes" },
        { key: "transacoes", label: "Transacoes", descricao: "Registre receitas e despesas" },
        { key: "relatorio", label: "Relatorio", descricao: "Acompanhe os totais" }
    ];

    return (
        <div className="app-shell">
            <section className="hero-card">
                <div>
                    <p className="eyebrow">Painel financeiro</p>
                    <h1>Controle de gastos</h1>
                    <p className="hero-copy">
                        Organize pessoas, transacoes e resumo financeiro em uma experiencia mais clara e elegante.
                    </p>
                </div>

                <nav className="tabs" aria-label="Navegacao principal">
                    {abas.map((aba) => (
                        <button
                            key={aba.key}
                            className={`tab-button ${pagina === aba.key ? "active" : ""}`}
                            onClick={() => setPagina(aba.key)}
                        >
                            <strong>{aba.label}</strong>
                            <div style={{ fontSize: "0.77rem", opacity: 0.9 }}>{aba.descricao}</div>
                        </button>
                    ))}
                </nav>
            </section>

            <section className="content-card">
                {pagina === "pessoas" && <Pessoas />}
                {pagina === "transacoes" && <Transacoes />}
                {pagina === "relatorio" && <Relatorio />}
            </section>
        </div>
    );
}

export default App;
