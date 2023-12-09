import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ShowProductosVendidos = () => {

    const [productos, setProductos] = useState([]); 
    const {idUsuario} = useParams()
    useEffect( () => {getProductosDeUsuario()}, []);

    const getProductosDeUsuario = async () => {
        fetch(`http://localhost:3001/productos/usuario/${idUsuario}/vendidos`, {
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
        <div>
            <div className="row" style={{justifyContent: 'center'}}>  
                {productos.length==0 ? (
                    <p> No existen productos vendidos.</p> 
                ) : productos.map(producto => (
                    <div class="card tarjeta col-md-3 col-sm-2" >
                        <div className="card-body">
                            <img className="card-img-top" src={producto.foto} alt={producto.titulo} style={{ objectFit: 'contain', height: '25vmin'}} />
                            <h5 className="card-title">{producto.titulo}</h5>
                            <p className="card-text">{producto.descripcion}</p>
                            <p className="card-text">Maxima puja: {producto.maximaPuja}</p>
                            <a href={`/detallesProducto/${idUsuario}/${producto._id}`} className='btn btn-secondary'>Ver mas informacion</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowProductosVendidos