import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const CompShowPujas = () => {
    const {idUsuario} = useParams()
    const {idProducto} = useParams()


    const [producto, setProducto] = useState([]);
    useEffect(() => {
        getProductos()
    }, []);

    const getProductos = async () => {
        console.log(idProducto);
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
    }


    const [vendedor, setVendedor] = useState({});
    useEffect(() => {
        console.log(idUsuario);
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
    },[]);



    return (
        <div>
            <div class="buscador-center col 4">
                <form class="buscador-center">
                    <input className='barrabusquedabig' placeholder="Puja nueva" />
                    <button class="botonBusqueda col 1" type="submit" >Pujar</button>
                </form>
            </div>
            
            <b>FECHA FINAL DE PUJA</b>
                <div class="card">
                    <div class="card-body">
                        <ul>
                            <li>puja 1 </li>
                            <li>puja 2 </li>
                            <li>puja 3 </li>
                        </ul>
                    </div>
                </div>
        </div>
    );
}

export default CompShowPujas;