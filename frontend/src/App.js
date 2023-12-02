import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Productos from "./productos/ShowProductos.js"
import ProductosBloque from './pages/ProductosBloque.jsx';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductosBloque/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
