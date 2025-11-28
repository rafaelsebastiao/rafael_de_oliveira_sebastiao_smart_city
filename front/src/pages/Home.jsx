import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import style from './Home.module.css'

export function Home(){
    return (
        <>
            <main className={style.corpo}>
                <h1>Bem vindo!</h1>
            </main>
        </>
    )
}