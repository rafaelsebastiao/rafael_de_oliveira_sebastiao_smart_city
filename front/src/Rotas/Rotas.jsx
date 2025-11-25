import { Routes, Route } from "react-router-dom";
import { Menu } from '../Componentes/Menu';
import { Inicial } from "../Paginas/Inicial";
import { Login } from "../Paginas/Login";

import {Home} from '../Paginas/Home';
import {Ambientes} from "../Paginas/Ambientes";
import {Sensores} from "../Paginas/Sensores";
import {Historico} from "../Paginas/Historico";

import { CadastrarSensores } from "../Paginas/CadastrarSensores";
import { ListarSensores } from "../Paginas/ListarSensores";
import { ListarAmbientes } from "../Paginas/ListarAmbientes";
import { ListarHistoricos } from "../Paginas/ListarHistoricos";

export function Rotas(){
    return(
         <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/inicial" element={<Inicial />} >
            
            <Route index element={<Menu />} />
            
            <Route path="home" element={<Home />} />
 
            <Route path="sensores" element={< Sensores/>}></Route>
            <Route path="historico" element={<Historico/>} />
            
            {/* Telas de sensores */}
            <Route path="sensores/cadastrarSensores" element={<CadastrarSensores />} />
            <Route path="sensores/editarSensores" element={<CadastrarSensores />} />
            <Route path="sensores/listarSensores" element={<ListarSensores />} />


            {/* Telas de ambientes */}
            <Route path="ambientes" element={<Ambientes />} />
            <Route path="ambientes/listarAmbientes" element={<ListarAmbientes />} />

            {/* Telas de historicos */}
            <Route path="historico/listarHistoricos" element={<ListarHistoricos />} />



            </Route>
        </Routes>
    )
}