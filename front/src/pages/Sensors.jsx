import { Link, Outlet } from "react-router-dom";


import estilo from './Sensors.module.css'
export function Sensors(){

    return (
        <>
            <main>
                <nav className={estilo.menuFlex} >
                    <Link to="registerSensors" className={estilo.menuItem}>Cadastrar Sensores</Link>
                    <Link to="editSensores"className={estilo.menuItem}>Editar sensores</Link>
                    <Link to="listSensors"className={estilo.menuItem}>ListarSensores</Link>
                </nav>
            </main>
        </>
    )
 
    
}