import { Cabecalho } from '../Componentes/Cabecalho';
import { Outlet } from 'react-router-dom';
import { Rodape } from '../Componentes/Rodape';
import estilo from './Inicial.module.css';
export function Inicial(){
    return(
        <>
            <Cabecalho/>
            <main className={estilo.corpo}>
                <Outlet/>
            </main>
            <Rodape/>
        </>
    );
}