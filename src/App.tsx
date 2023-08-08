import React from 'react';
import './App.css';
import Formulario from "./components/Formulario";
import FormularioAvancado from "./components/FormularioAvancado";
import Home from "./components/Home";
// import {useTranslation} from "react-i18next";


function App() {
    // const { t,i18n } = useTranslation();
    // const changeLanguage = (lng: string) => {
    //     i18n.changeLanguage(lng).then();
    // };

    {/*<div>*/}
    {/*<button onClick={() => changeLanguage('en')}>EN</button>*/}
    {/*<button onClick={() => changeLanguage('pt-BR')}>PT-BR</button>*/}
    {/*</div>*/}
    const pathname = window.location.pathname;

    if (pathname === '/formulario') {
        return <Formulario />;
    }

    if (pathname === '/formulario-avancado') {
        return <FormularioAvancado />;
    }

    return <Home />;

}

export default App;
