import style from './Header.module.css';
import logo from '../assets/logo.png';
import { useHeader } from '../contexts/HeaderContext';


export function Header(){
    const {headerStyle} = useHeader() 
    return(
        <header className={style.cabecalho} style={headerStyle}>
            <img src={logo} alt="Logo Smartcity" className={style.logo}/>
            <h1 className={style.titulo}>SmartCity</h1>
        </header>
    )

}