import { Link } from "react-router-dom";
import estilo from './Sensores.module.css'

export function Historico(){
    return (
        <>
            <main>
                <nav className={estilo.menuFlex} >
                    <Link to="listarHistoricos" className={estilo.menuItem}>Listar históricos</Link>
                </nav>
            </main>
        </>
    )
    
}