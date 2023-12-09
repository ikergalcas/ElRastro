import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShowProductosSinVender = () => {

    const [productos, setProductos] = useState([]); 
    const idUsuario = '653fe434b1b1e5d84c3ed746';
    useEffect( () => {getUsuario()}, []);

    const getUsuario = async () => {
        fetch('http://localhost:3001/productos/usuario/653fe434b1b1e5d84c3ed746/sinVender', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setProductos(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }

    return (
        <div className="row" style={{justifyContent: 'center'}}>  
            {productos.length==0 ? (
                <p> No hay productos sin vender.</p> 
            ) : productos.map(producto => (
                <div class="card tarjeta col-md-3 col-sm-2" >
                <div className="card-body">
                    <img className="card-img-top" src={producto.foto} alt={producto.titulo} style={{ objectFit: 'contain', height: '25vmin'}} />
                    <h5 className="card-title">{producto.titulo}</h5>
                    <p className="card-text">{producto.descripcion}</p>
                    <p className="card-text">Maxima puja: {producto.maximaPuja}</p>
                    <a href={`/detallesProducto/${idUsuario}/${producto._id}`} className='btn btn-secondary'>Ir a productos</a>
                </div>
            </div>
            ))
            
            }
        </div>


    )
}

export default ShowProductosSinVender