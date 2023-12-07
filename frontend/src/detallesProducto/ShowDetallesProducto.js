import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CompShowDetallesProducto = () => {
    const {idUsuario, idProducto} = useParams()

    

    // Obtenemos el producto y el vendedor
    const [producto, setProducto] = useState({});
    const [vendedor, setVendedor] = useState({});

    //Dentro de un useEffect hacemos las 2 consultas porque las solicitudes http son asincronas y en la
    //segunda consulta uso el atributo vendedor de la primera
    useEffect(() => {
        // Hacer la solicitud para obtener productos desde el backend
        fetch(`http://localhost:3001/productos/${idProducto}`)
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los productos obtenidos
                setProducto(data);

                // Hacer la solicitud para obtener el vendedor
                return fetch(`http://localhost:3003/usuarios/${data.vendedor}`);
            })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con el vendedor obtenido
                setVendedor(data);
            })
            .catch(error => {
                console.error('Error al obtener producto o vendedor:', error);
            });
    }, [idProducto]);
    

    return (
        <div className='container'>
            <div className='row'>
                <div className='col 4'>
                    <img src={producto.foto} style={{width: '30%', borderRadius:'5px'}} className="card-img-top img-fluid"></img>
                    <p>
                        {vendedor.username}
                        {}
                    </p>
                </div>
                <div className='col 8'>
                    <div className='row'>
                        <div className='col 6'>
                            <p>{producto.titulo}</p>
                        </div>
                        <div className='col 2'>
                            <p>Precio: {producto.precioFinal}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>{producto.descripcion}</p>
                            <p>{producto.ubicacion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompShowDetallesProducto;