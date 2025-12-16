import { useEffect } from "react"
import axios from "axios"
import { apiURL } from "../base/apiBase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from '../styles/ListSensors.module.css'

import { useHeader } from "../contexts/HeaderContext"
import { useFooter } from "../contexts/FooterContext"


export function ListSensors(){
    const { setFooterStyle } = useFooter()
    const {setHeaderStyle} = useHeader()

    const [sensores, setSensores] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // Quando entrar na página de sensores
        setFooterStyle({ 
            marginTop: '10000px',
            
        });

        setHeaderStyle({
            marginBottom:'9450px'
        })
        
        const token = localStorage.getItem('access_token')
        if (!token) return;
        
        axios.get(`${apiURL}/sensors/`, {
            headers: {'Authorization': `Bearer ${token}`}
        }).then(response => setSensores(response.data))
        .catch(error => {
            console.log("Erro ao buscar sensores", error) 
            alert("Login expirado!")
            navigate('/', {replace:true})
        })

        return () => {
            // Limpa quando sair da página
            setFooterStyle({})
        }
    }, [setFooterStyle, navigate]) 

    const putSensor = (...sensorColumns) => {
        const token = localStorage.getItem('access_token')
        let temperature = window.prompt("Informe o novo valor da temperatura: ")
        
        if (!temperature) return;
        
        sensorColumns[1] = temperature

        let updateData = {
            "sensor": sensorColumns[1],
            "mac_address": sensorColumns[2],
            "unity_mec": sensorColumns[3],
            "latitude": sensorColumns[4],
            "longitude": sensorColumns[5],
            "status": sensorColumns[6],
            "environment": sensorColumns[7]
        }

        axios.put(`${apiURL}/sensor/${sensorColumns[0]}`, updateData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            alert(`Sensor ${sensorColumns[0]} atualizado com sucesso!`)
            window.location.reload()
        })
        .catch(error => {
            console.error("Erro ao atualizar sensor:", error)
            alert("Erro ao atualizar sensor")
        })
    }

    return (
        <main className={style.main_container}>
            <h2 className={style.title}>Sensores ({sensores.length})</h2>
            <div className={style.sensors_grid} >
                {sensores.slice(0, sensores.length).map(sensor => (
                    <div key={sensor.id} className={style.sensor_card}>
                        <div className={style.sensor_field}>
                            <span className={style.sensor_label}>ID: </span>
                            <span className={style.sensor_value}>{sensor.id}</span>
                        </div>
                        <div className={style.sensor_field}>
                            <span className={style.sensor_label}>Sensor: </span>
                            <span className={style.sensor_value}>{sensor.sensor}</span>
                        </div>
                        <div className={style.sensor_field}>
                            <span className={style.sensor_label}>MAC: </span>
                            <span className={style.sensor_value}>{sensor.mac_address}</span>
                        </div>
                        <div className={style.sensor_field}>
                            <span className={style.sensor_label}>Status: </span>
                            <span className={`${style.sensor_status} ${
                                sensor.status ? style.status_active : style.status_inactive
                            }`}>
                                {sensor.status ? "Ativo" : "Inativo"}
                            </span>
                        </div>
                        <div className={style.sensor_field}>
                            <span className={style.sensor_label}>Localização: </span>
                            <span className={style.sensor_value}>
                                {sensor.latitude}, {sensor.longitude}
                            </span>
                        </div>
                        <button 
                            className={style.sensor_button}
                            onClick={() => putSensor(
                                sensor.id, 
                                sensor.sensor, 
                                sensor.mac_address, 
                                sensor.unity_mec, 
                                sensor.latitude, 
                                sensor.longitude, 
                                sensor.status, 
                                sensor.environment
                            )}
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </main>
    )
}