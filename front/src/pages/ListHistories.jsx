import { useEffect } from "react"

import axios from "axios"
import { apiURL } from "../base/apiBase"
import { useState } from "react"

import { useNavigate } from "react-router-dom"

export function ListHistories(){
    const [history, setHistories] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('access_token')

        if(!token) return;

        axios.get(`${apiURL}/histories/`, {
            headers: {'Authorization': `Bearer ${token}`}

        }).then(response => setHistories(response.data))
        .catch(
            error=> {
                
                if(error.response){
                    const status = error.response.status

                    if(status == 401){
                        alert("Login expirado!")
                        navigate('/', {replace:true} )
                    }else{
                        alert(status)
                        console.log("Erro ao buscar historicos", error) 
                    }

                    
                }

                
                
            })
    }, [])


    return (
        <>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                </thead>

                <tbody>
                    {history.map(history => (
                        /*
                            class Environment(models.Model):
    local = models.ForeignKey(Local, to_field='id', on_delete=models.CASCADE)
    description = models.TextField(null=False, blank=False)
    responsible = models.ForeignKey(Responsible, to_field='id', on_delete=models.CASCADE, null=False, blank=False)

                        */
                        <tr key={history.id}>
                            <td>{history.sensor}</td>
                            <td>{history.valor}</td>
                            <td>{history.timestamp}</td>
                        </tr>

                    ))}
                </tbody>
                </table>
            </main>
        </>
    )
}