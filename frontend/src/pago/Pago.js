import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CompPago = () => {
    const { idComprador, idProducto } = useParams()

    const [huellaCarbono, setHuellaCarbono] = useState()
    const [vendedor, setVendedor] = useState()
    const [producto, setProducto] = useState()

    useEffect(() => {
        var raw = JSON.stringify({
            "idComprador" : idComprador,
            "idProducto" : idProducto
        })

        fetch('http://localhost:3001/productos/huellaCarbonoNuevo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setProducto(data.producto)
            setVendedor(data.vendedor)
            setHuellaCarbono(data.huellaCarbono)
            console.log(data.producto)
            console.log(data.vendedor)
            console.log(data.huellaCarbono)
        })
    }, [])    

    return(
        <div>
            <h1>PAGAME HIJUEPUTA</h1> <br/>
            <h3>Huella carbono {huellaCarbono && huellaCarbono}</h3> <br/>
            <h3>Vendedor {vendedor && vendedor.username}</h3> <br></br>
            <h3>Producto {producto && producto.titulo}</h3>
        </div>
    )
}

export default CompPago