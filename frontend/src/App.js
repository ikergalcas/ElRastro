import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Productos from "./productos/ShowProductos.js"



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Productos/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
