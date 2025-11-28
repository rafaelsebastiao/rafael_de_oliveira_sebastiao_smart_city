import { useEffect } from "react"


import axios from "axios"
import { apiURL } from "../base/apiBase"
import { useState } from "react"

import { useNavigate } from "react-router-dom"




export function ListEnvironments(){
    const [environment, setEnvironments] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('access_token')

        if(!token) return;

        axios.get(`${apiURL}/environments/`, {
            headers: {'Authorization': `Bearer ${token}`}

        }).then(response => setEnvironments(response.data))
        .catch(
            error=> {
                
                if(error.response){
                    const status = error.response.status

                    if(status == 401){
                        alert("Login expirado!")
                        navigate('/', {replace:true} )
                    }else{
                        alert(status)
                        console.log("Erro ao buscar ambientes", error) 
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
                    {environment.map(environment => (
                        /*
                            class Environment(models.Model):
    local = models.ForeignKey(Local, to_field='id', on_delete=models.CASCADE)
    description = models.TextField(null=False, blank=False)
    responsible = models.ForeignKey(Responsible, to_field='id', on_delete=models.CASCADE, null=False, blank=False)

                        */
                        <tr key={environment.id}>
                            <td>{environment.local}</td>
                            <td>{environment.description}</td>
                            <td>{environment.responsible}</td>
                        </tr>

                    ))}
                </tbody>
                </table>
            </main>
        </>
    )
}