import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import style from './Inicial.module.css';

import { FooterProvider } from '../contexts/FooterContext';
import { HeaderProvider } from '../contexts/HeaderContext';


export function Inicial(){
    return(
        <HeaderProvider>
            <FooterProvider>
                <Header />
                <main className={style.corpo}>
                    <Outlet/>
                </main>
                <Footer/>
            </FooterProvider>
        </HeaderProvider>
    );
}