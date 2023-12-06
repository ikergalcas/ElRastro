import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const CompShowDetallesProducto = () => {
    const {idUsuario} = useParams()
    const {idProducto} = useParams()


    const [producto, setProducto] = useState([]);
    useEffect(() => {
        // Hacer la solicitud para obtener productos desde el backend
        fetch(`http://localhost:3001/productos/${idProducto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los productos obtenidos
                setProducto(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener producto:', error);
            });
    }, []);


    const [vendedor, setVendedor] = useState([]);
    useEffect(() => {
        // Hacer la solicitud para obtener productos desde el backend
        fetch(`http://localhost:3003/usuarios/${producto.vendedor}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los productos obtenidos
                setVendedor(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener vendedor:', error);
            });
    }, []);


    return (
        <div>
        {idUsuario === producto.vendedor ? (
            // ESTE ES PRODCUTO PROPIO 
            <p>Mi Producto</p>
        ) : (
            // A PARTIR DE AQUÍ ES PRODUCTO AJENO
            <div className='container'>
                <div className='row'>
                    <p>Producto Ajeno</p>
                    
                    <div className='col 4'> 
                        <img src={producto.foto} style={{width: '30%', borderRadius:'5px'}} className="card-img-top img-fluid"></img>
                        <p>{vendedor.username} - {vendedor.valoracionMedia} </p>
                    </div>
                    <div className='col 8'>
                        <p >{producto.titulo}</p>
                        <p>{producto.descripcion}</p>
                        <p>{producto.ubicacion}</p>
                    </div>
                </div>
                
            </div>
        )}
        </div>
    );
};

export default CompShowDetallesProducto;
