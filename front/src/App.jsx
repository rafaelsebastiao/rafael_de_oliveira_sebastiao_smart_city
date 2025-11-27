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

