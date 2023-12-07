import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Productos from "./productos/ShowProductos.js"
import ProductosInicial from "./pages/ProductosInicial.jsx"
import Login from "./login/Login.js"
import EditUsuario from "./usuario/EditUser.js"
import ProductoBloque from './pages/ProductoBloque.jsx';

//

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/productos" element={<ProductosInicial/>}/>
          <Route path="/detallesProducto/:idUsuario/:idProducto" element={<ProductoBloque/>}/>
          <Route path="/editUser" element={<EditUsuario/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
