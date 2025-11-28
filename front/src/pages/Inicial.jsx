import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import style from './Inicial.module.css';

import { FooterProvider } from '../contexts/FooterContext';


export function Inicial(){
    return(
        <FooterProvider>
            <Header/>
            <main className={style.corpo}>
                <Outlet/>
            </main>
            <Footer/>
        </FooterProvider>
    );
}