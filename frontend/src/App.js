import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Productos from "./productos/ShowProductos.js"
import ProductosInicial from "./pages/ProductosInicial.jsx"
import Login from "./login/Login.js"
import ShowUsuario from "./pages/ShowUsuario.jsx"
import MiProductoBloque from './pages/ProductoBloque.jsx';

import ProductosVendidos from './pages/ShowProductosVendidos.jsx';
import ProductosSinVender from './pages/ShowProductosSinVender.jsx';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductosInicial/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/productos" element={<ProductosInicial/>}/>
          <Route path="/detallesProducto/:idUsuario/:idProducto" element={<MiProductoBloque/>}/>
          <Route path="/editUser" element={<ShowUsuario/>}/>
          <Route path="/ProductosVendidos" element={<ProductosVendidos/>}/>
          <Route path="/ProductosSinVender" element={<ProductosSinVender/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
