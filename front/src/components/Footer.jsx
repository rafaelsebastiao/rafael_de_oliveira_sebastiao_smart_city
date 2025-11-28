import style from './Footer.module.css';
import { useFooter } from '../contexts/FooterContext';

export function Footer(){
    const {footerStyle} = useFooter()

    return(
        <footer className={style.footer} style={footerStyle}>
            <h3>Todos os direitos Reservados</h3>
        </footer>
    )
}