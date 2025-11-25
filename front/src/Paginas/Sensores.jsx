import { Link, Outlet } from "react-router-dom";

import estilo from './Sensores.module.css'
export function Sensores(){


    return (
        <>
            <main>
                <nav className={estilo.menuFlex} >
                    <Link to="cadastrarSensores" className={estilo.menuItem}>Cadastrar Sensores</Link>
                    <Link to="editarSensores"className={estilo.menuItem}>Editar sensores</Link>
                    <Link to="listarSensores"className={estilo.menuItem}>ListarSensores</Link>
                </nav>
            </main>
        </>
    )
    
}