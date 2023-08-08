import React from 'react';

function Home() {

    return (
        <div>
            <h1>Olá</h1>
            <p>Bem vindos(as) ao workshop de React Hook Form.</p>
            <p>Escolha uma das opções abaixo para começar:</p>

            <button className="btn btn-info" onClick={() => window.location.href = '/formulario'}>Ir para Formulário padrão</button>
            <button className="btn btn-warning" onClick={() => window.location.href = '/formulario-avancado'}>Ir para Formulário avançado</button>
        </div>
    );
};

export default Home;
