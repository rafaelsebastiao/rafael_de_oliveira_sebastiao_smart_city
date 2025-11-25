import { Cabecalho } from "../Componentes/Cabecalho"
import { Rodape } from "../Componentes/Rodape"
import estilo from './Home.module.css'

export function Home(){
    return (
        <>
            <main className={estilo.corpo}>
                <h1>Bem vindo!</h1>
            </main>
        </>
    )
}