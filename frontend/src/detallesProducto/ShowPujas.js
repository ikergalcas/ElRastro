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

    const [pujas, setPujas] = useState({});
    useEffect(() => {
        // Hacer la solicitud para obtener productos desde el backend
        fetch(`http://localhost:3002/pujas/producto/${idProducto}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los productos obtenidos
                setPujas(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener pujas:', error);
            });

        //    <ul>
        //    {pujas.length==0 ? (
        //    <p> No pujas.</p> 
        //        ) : pujas.map(puja => (
        //        <li>
        //            <p>Usuario: {puja.usuario.username}</p>
        //            <p>Precio: {puja.precio}</p>
        //        </li>
        //        ))}
        //    </ul>
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
                   
                    </div>
                </div>
        </div>
    );
}

export default CompShowPujas;