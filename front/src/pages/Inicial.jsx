import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import estilo from './Inicial.module.css';
export function Inicial(){
    return(
        <>
            <Header/>
            <main className={estilo.corpo}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
}