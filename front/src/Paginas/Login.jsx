import estilo from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import {apiURL} from '../base/apiBase';

import axios from 'axios';
const schemaLogin = z.object({
    username: z.string()
        .trim()
        .min(1, 'Informe um nome')
        .max(25, 'Máximo de 25 caracteres'),

    password: z.string()
        .trim()
        .min(1, 'Informe uma senha')
        .max(15, 'Máximo de 15 caracteres'),
});

export function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaLogin),
    });

    // function enviarDados(data) {
    //     console.log("Login feito:", data);
    //     navigate("/inicial");
    // }

    async function enviarDados(data){
        try{
            const response = await axios.post(`${apiURL}/token/`, {
                username: data.username,
                password:data.password

            })

            const {access, refresh} = response.data

            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            console.log("Login bem sucedido!")

            navigate('/inicial')

        }catch(error){
            console.log('Erro de autenticação')
            alert("Dados inválidos!")
            console.log(error)
          
        }
    }
    return (
        <section className={estilo.container}>
            <form className={estilo.formulario} onSubmit={handleSubmit(enviarDados)}>

                <h2 className={estilo.titulo}>Acesso ao Sistema</h2>

         
                <label htmlFor="usuario">Usuário:</label>
                <input
                    id="usuario"
                    type="text"
                    placeholder="Digite seu usuário"
                    {...register("username")}
                />
                {errors.username && (
                    <p className={estilo.erro}>{errors.username.message}</p>
                )}

              
                <label htmlFor="senha">Senha:</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                />
                {errors.password && (
                    <p className={estilo.erro}>{errors.password.message}</p>
                )}

                <button className={estilo.botao}>Entrar</button>

            </form>
        </section>
    );
}
