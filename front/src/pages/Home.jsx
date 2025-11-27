import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
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