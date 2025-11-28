import style from './RegisterSensor.module.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import { apiURL } from '../base/apiBase';

import axios from 'axios';
const schemaSensor = z.object({
    sensor: z.string()
        .trim()
        .min(1, 'Informe um nome')
        .max(25, 'Máximo de 25 caracteres'),

    password: z.string()
        .trim()
        .min(1, 'Informe uma senha')
        .max(15, 'Máximo de 15 caracteres'),
});

export function RegisterSensors() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaSensor),
    });

    // function enviarDados(data) {
    //     console.log("Login feito:", data);
    //     navigate("/inicial");
    // }

    async function enviarDados(data) {
        try {
            const response = await axios.post(`${apiURL}/sensors/`, {
                username: data.username,
                password: data.password

            })

            const { access, refresh } = response.data

            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            console.log("Login bem sucedido!")

            navigate('/inicial')

        } catch (error) {
            console.log('Erro de autenticação')
            alert("Dados inválidos!")
            console.log(error)

        }
    }
    return (
        <section className={style.container}>
            <form className={style.formulario} onSubmit={handleSubmit(enviarDados)}>

                <h2 className={style.titulo}>Cadastrar Sensores</h2>


                <label htmlFor="usuario">Sensor:</label>
                <input
                    id="sensor"
                    type="text"
                    placeholder="Digite o tipo de sensor"
                    {...register("username")}
                />
                {errors.username && (
                    <p className={style.erro}>{errors.username.message}</p>
                )}


                <label htmlFor="senha">Mac Address:</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                />
                {errors.password && (
                    <p className={style.erro}>{errors.password.message}</p>
                )}

                <label htmlFor="senha">Unity_mec:</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                />
                {errors.password && (
                    <p className={style.erro}>{errors.password.message}</p>
                )}


                <label htmlFor="senha">Latitude:</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                />
                {errors.password && (
                    <p className={style.erro}>{errors.password.message}</p>
                )}


                <label htmlFor="senha">Longitude:</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                />
                {errors.password && (
                    <p className={style.erro}>{errors.password.message}</p>
                )}

<label htmlFor="senha">Longitude:</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("password")}
                />
                {errors.password && (
                    <p className={style.erro}>{errors.password.message}</p>
                )}


                <button className={style.botao}>Entrar</button>

            </form>
        </section>
    );
}
