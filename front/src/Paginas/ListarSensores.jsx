import { useEffect } from "react"

import axios from "axios"
import { apiURL } from "../base/apiBase"
import { useState } from "react"

import { useNavigate } from "react-router-dom"

import estilo from './ListarSensores.module.css'

export function ListarSensores(){
    const [sensores, setSensores] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('access_token')

        if(!token) return;

        axios.get(`${apiURL}/sensors/`, {
            headers: {'Authorization': `Bearer ${token}`}

        }).then(response => setSensores(response.data))
        .catch(
            error=> {
                console.log("Erro ao buscar sensores", error) 
                
                alert("Login expirado!")
                navigate('/', {replace:true} )
            })
    }, [])

      return (
        <main style={{ padding: '20px' }}>
            <h2>Sensores ({sensores.length})</h2>
            <div className={estilo.sensors_grid}>
                {sensores.map(sensor => (
                    
                    <div key={sensor.id} className={estilo.sensor_card}>
                        <div className={estilo.sensor_field}>
                            <span className="sensor-label">ID: </span>
                            <span className="sensor-value">{sensor.id}</span>

                        </div>
                        <div className={estilo.sensor_field}>
                            <span className="sensor-label">Sensor: </span>
                            <span className="sensor-value">{sensor.sensor}</span>
                        </div>
                        <div className={estilo.sensor_field}>
                            <span className="sensor-label">MAC: </span>
                            <span className="sensor-value">{sensor.mac_address}</span>
                        </div>
                        <div className={estilo.sensor_field}>
                            <span className="sensor-label">Status: </span>
                            <span className="sensor-status">
                                {sensor.status ? "Ativo" : "Inativo"}
                            </span>
                        </div>

                        <div className="sensor_field">
                            <span className="sensor_label">Localização: </span>
                            <span className={estilo.sensor_value}>
                                {sensor.latitude}, {sensor.longitude}
                            </span>
                        </div>
                        
                    </div>
                ))}
            </div>
        </main>
    )
}