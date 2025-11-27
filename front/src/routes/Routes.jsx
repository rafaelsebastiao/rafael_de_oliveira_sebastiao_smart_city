import { Routes, Route } from "react-router-dom";
import { Menu } from '../components/Menu';
import { Inicial } from "../pages/Inicial";
import { Login } from "../pages/Login";

import {Home} from '../pages/Home';
import {Environments} from "../pages/Environments";
import {Sensors} from "../pages/Sensors";
import {History} from "../pages/History";

import { CadastrarSensores } from "../pages/CadastrarSensores";
import { ListSensors } from "../pages/ListSensors";
import { ListEnvironments } from "../pages/ListEnvironments";
import { ListHistories } from "../pages/ListHistories";

export function MyRoutes(){
    return(
         <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/inicial" element={<Inicial />} >
            
            <Route index element={<Menu />} />
            
            <Route path="home" element={<Home />} />
 
            <Route path="sensors" element={< Sensors/>}></Route>
            <Route path="history" element={<History />} />
            
            {/* Telas de sensores */}
            <Route path="sensores/cadastrarSensores" element={<CadastrarSensores />} />
            <Route path="sensores/editSensores" element={<CadastrarSensores />} />
            <Route path="sensores/listSensors" element={<ListSensors />} />


            {/* Telas de ambientes */}
            <Route path="environments" element={<Environments />} />
            <Route path="environments/listEnvironments" element={<ListEnvironments />} />

            {/* Telas de historicos */}
            <Route path="historico/listarHistoricos" element={<ListHistories />} />


            </Route>
        </Routes>
    )
}