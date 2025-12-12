

import { BrowserRouter } from 'react-router-dom';
import { MyRoutes } from './routes/Routes'; 

import './app.css';

function App() {

  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  )

}

export default App

// import React from 'react';

// import Modal from 'react-modal';

// // Importa a modal do react-modal
// // Código necessário para os recursos de acessibilidade
// Modal.setAppElement('#root');

// function App() {
//   // Hook que demonstra se a modal está aberta ou não
//   const [modalIsOpen, setIsOpen] = React.useState(false);

//   // Função que abre a modal
//   function abrirModal() {
//     setIsOpen(true);
//   }

//   // Função que fecha a modal
//   function fecharModal() {
//     setIsOpen(false);
//   }

//   // Código JSX necessário para criar uma modal simples que abre e fecha
//   return (
//     <div>
//       <button onClick={abrirModal}>Abrir modal</button>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={fecharModal}
//         contentLabel="Modal de exemplo"
//       >
//         <h2>Olá</h2>
//         <button onClick={fecharModal}>Fechar</button>
//         <div>Eu sou uma modal</div>
//       </Modal>
//     </div>
//   );
// }

// export default App;

