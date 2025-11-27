import { Link } from "react-router-dom";

import estilo from './Sensors.module.css'
export function Environments(){


    return (
        <>
            <main>
                <nav className={estilo.menuFlex} >
                    <Link to="listEnvironments" className={estilo.menuItem}>Listar ambientes</Link>
                </nav>
            </main>
        </>
    )
    
}