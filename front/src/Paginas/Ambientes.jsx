import { Link } from "react-router-dom";

import estilo from './Sensores.module.css'
export function Ambientes(){


    return (
        <>
            <main>
                <nav className={estilo.menuFlex} >
                    <Link to="listarAmbientes" className={estilo.menuItem}>Listar ambientes</Link>
                </nav>
            </main>
        </>
    )
    
}