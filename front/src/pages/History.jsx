import { Link } from "react-router-dom";
import estilo from './Sensors.module.css'

export function History(){
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