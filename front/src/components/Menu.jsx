import estilo from './Menu.module.css';
import { Link } from 'react-router-dom';

export function Menu() {
  return (
    
    <nav className={estilo.menuGrid}>
      <Link to="home" className={estilo.menuItem}>Home</Link>
      <Link to="environments" className={estilo.menuItem}>Ambientes</Link>
      <Link to="sensors" className={estilo.menuItem}>Sensores</Link>
      <Link to="history" className={estilo.menuItem}>Histórico</Link>


    </nav>

  );
}
