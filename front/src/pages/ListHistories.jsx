import { useEffect } from "react"
import axios from "axios"
import { apiURL } from "../base/apiBase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from '../styles/ListHistories.module.css'
import { useFooter } from "../contexts/FooterContext"


export function ListHistories(){
    const { setFooterStyle } = useFooter()
    const [histories, setHistories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // Quando entrar na página de sensores
        setFooterStyle({ 
            marginTop: '500px',
            
         
        });
        
        const token = localStorage.getItem('access_token')
        if (!token) return;
        
        axios.get(`${apiURL}/histories/`, {
            headers: {'Authorization': `Bearer ${token}`}
        }).then(response => setHistories(response.data))
        .catch(error => {
            console.log("Erro ao buscar historicos", error) 
            alert("Login expirado!")
            navigate('/', {replace:true})
        })

        return () => {
            // Limpa quando sair da página
            setFooterStyle({})
        }
    }, [setFooterStyle, navigate]) 

    

    return (
        <main className={style.main_container}>
            <h2 className={style.title}>Historicos ({histories.length})</h2>
            <div className={style.histories_grid} >
                {histories.slice(0, 20).map(history => (
                    <div key={history.id} className={style.history_card}>
                        <div className={style.history_field}>
                            <span className={style.history_label}>ID: </span>
                            <span className={style.history_value}>{history.id}</span>
                        </div>
                        <div className={style.history_field}>
                            <span className={style.history_label}>Sensor: </span>
                            <span className={style.history_value}>{history.sensor}</span>
                        </div>
                        <div className={style.history_field}>
                            <span className={style.history_label}>Value: </span>
                            <span className={style.history_value}>{history.value}</span>
                        </div>
                        <div className={style.history_field}>
                            <span className={style.history_label}>Timestamp: </span>
                            <span className={`${style.history_label}}`}>
                                {history.timestamp}
                            </span>
                        </div>
                     
                        <button 
                            className={style.history_button}
                            onClick={() => {

                            }
                            }
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </main>
    )
}