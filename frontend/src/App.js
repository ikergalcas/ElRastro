import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Productos from "./productos/ShowProductos.js"
import Login from "./login/Login.js"
import DetallesProducto from "./productos/ShowDetallesProducto.js"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/productos" element={<Productos/>}/>
          <Route path="/detallesProducto" element={<DetallesProducto/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
