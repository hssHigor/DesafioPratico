import { useState } from "react";

import Pessoas from "./pages/Pessoas/Pessoas";
import { Transacoes } from "./pages/Transacoes/Transacoes";
import { Relatorio } from "./pages/Relatorio/Relatorio";


function App() {

    const [pagina, setPagina] = useState("pessoas");


    return (
        <>
            <h1>Controle de Gastos</h1>


            <nav>
                <button onClick={() => setPagina("pessoas")}>
                    Pessoas
                </button>

                <button onClick={() => setPagina("transacoes")}>
                    Transações
                </button>

                <button onClick={() => setPagina("relatorio")}>
                    Relatório
                </button>
            </nav>


            <hr />


            {pagina === "pessoas" && <Pessoas />}

            {pagina === "transacoes" && <Transacoes />}

            {pagina === "relatorio" && <Relatorio />}
        </>
    );
}


export default App;