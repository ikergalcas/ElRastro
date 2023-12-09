import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShowMapaUsuario from './MapaUsuario.js';


const CompEditUser = () => {

    const [usuario, setUsuario] = useState([]); 
    const idUsuario = '653fe434b1b1e5d84c3ed746';
    useEffect( () => {getUsuario()}, []);

    const getUsuario = async () => {
        fetch('http://localhost:3003/usuarios/653fe434b1b1e5d84c3ed746', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            setUsuario(data);
            console.log("usuario encontrado")
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
        })
    }

    const productosEnVenta = async () => {}
    const productosVendidos = async () => {}

    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <h1>{usuario.username}, Valoración media = {usuario.valoracionMedia}</h1>

                </div>

                <div className='row'>
                <div className='container mb-4 col 4'>
                    <div className='card'>
                    <div className='card-body'>
                        <h2 className='card-title'> Información del usuario </h2>
                        Contacto: {usuario.contacto} <br/>
                        Ubicación: {usuario.ubicacion}
                        
                    </div>
                    </div>
                    </div>

                    <div className='col 8'> 
                        <p>Aquí va la imagen</p>
                    </div>

                </div>



                <div className='row'>
                    
                    <div className='col 4'>
                     <ShowMapaUsuario/>
                    </div>

                    <div className='col 10'> 
                        <form class="menu">
                        <Link to={`../ProductosVendidos`}> Productos vendidos</Link>
                        <br/>
                        <Link to={`../ProductosSinVender`}> Productos sin vender</Link>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompEditUser