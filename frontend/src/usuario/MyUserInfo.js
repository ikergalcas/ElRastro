import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShowMapaUsuario from './MapaUsuario.js';


const CompEditUser = () => {

    const [usuario, setUsuario] = useState([]); 
    const {idUsuario} = useParams();
    useEffect( () => {getUsuario()}, []);

    const getUsuario = async () => {
        fetch(`http://localhost:3003/usuarios/${idUsuario}`, {
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

    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className= "col">
                        <div className="container-fluid mt-3 mb-4">
                            <h1>{usuario.username}, Valoración media = {usuario.valoracionMedia}</h1>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-8'>
                        <div className= "container-fluid mb-4">
                            <div className='card'>
                                <div className='card-body'>
                                    <h2 className='card-title'> Información del usuario </h2>
                                    Contacto: {usuario.contacto} <br/>
                                    Ubicación: {usuario.ubicacion}
                                </div>
                                <div className='m-2'>
                                    <Link to={`/editarPerfil/${idUsuario}`} className="btn btn-secondary">Editar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'> 
                        <div className= "container-fluid ">
                            {(usuario.foto == "") ? 
                            <img className="card-img-top" src={"http://res.cloudinary.com/dten77l85/image/upload/v1702144932/e3u40bht3yjtycbck0ko.png"} alt={usuario.username} style={{ objectFit: 'contain', height: '20vmin'}} /> :
                            <img className="card-img-top" src={usuario.foto} alt={usuario.username} style={{ objectFit: 'contain', height: '20vmin'}} /> 
                            }
                        </div>
                    </div>
                </div>  

                <div className='row'>
                    
                    {/* <div className='col-4'>
                     <ShowMapaUsuario/>
                    </div> */}

                    <div className='col-8'>
                        <div className= "container-fluid ">
                            <a href={`../ProductosVendidos/${idUsuario}`} className='btn btn-success'>Productos vendidos</a>
                            <br/>
                            <a href={`../ProductosSinVender/${idUsuario}`} className='btn btn-primary mt-2'>Productos en venta</a>
                            <br/>

                            {/* <a href={`../`} className='btn btn-info mt-2'>Productos pujados</a>
                            <br/>
                            <a href={`../`} className='btn btn-info mt-2'>Productos comprados</a> */}
                        </div> 
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompEditUser