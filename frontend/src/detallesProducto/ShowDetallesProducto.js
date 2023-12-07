import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CompShowDetallesProducto = () => {
    const {idUsuario, idProducto} = useParams()

    // Obtenemos el producto y el vendedor
    const [producto, setProducto] = useState({});
    const [vendedor, setVendedor] = useState({});
    const [descripcion, setDescripcion] = useState('');

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
    
    // NO FUNCIONA
    const editarDescripcion = async (e, nuevaDescripcion) => {
        e.preventDefault();
    
        try {
            // Realizar una solicitud PUT al servidor para actualizar la descripción
            const response = await fetch(`http://localhost:3001/productos/${idProducto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ descripcion: nuevaDescripcion }),
            });
    
            if (response.ok) {
                // Actualizar el estado local directamente
            setProducto(prevProducto => ({
                ...prevProducto,
                descripcion: nuevaDescripcion,
            }));
            } else {
                console.error('Error al actualizar la descripción');
            }
        } catch (error) {
            console.error('Error al actualizar la descripción:', error);
        }
    };

    
    const [fotoNueva, setFotoNueva] = useState(null);
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
    
        setFotoNueva(file);
    
    };
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col 4'>
                    <div className='row'>
                        <div className='col'>
                            { //ACTUALIZAR FOTO -- NO TERMINADO
                            idUsuario == vendedor._id ? 
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*" // Para aceptar solo archivos de imagen
                                        onChange={handleFileChange}
                                    />

                                    {fotoNueva && (
                                        <div>
                                        <p>Nombre del archivo: {fotoNueva.name}</p>
                                        <p>Tipo de archivo: {fotoNueva.type}</p>
                                        </div>
                                    )}
                                </div>
                            : null
                            }

                            <img src={producto.foto} style={{width: '30%', borderRadius:'5px'}} className="card-img-top img-fluid"></img>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col 2'>
                            <div className='card text-center mt-3'>
                                <div className='card-body'>
                                    <h2 className='card-title'>
                                        {vendedor.username}
                                        { /* Mostrar estrellas según la valoracionMedia */
                                        Array.from({ length: vendedor.valoracionMedia }).map((_, index) => (
                                            <span key={index} className="text-warning">&#9733;</span>
                                        ))}
                                    </h2>
                                    
                                </div>
                            </div>
                        </div>
                        <div className='col 2'></div>
                    </div>
                </div>
                <div className='col 8'>
                    <div className='row'>
                        <div className='col 6'>
                            <h2 className='card-title'>{producto.titulo}</h2>
                        </div>
                        <div className='col 2'>
                            <h2 className='card-title'>Puja mas alta: {producto.maximaPuja}</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="card mb-4 h-100 w-100">
                                <div className='card-body overflow-auto'>
                                    <h5 className='card-title'>
                                        {producto.descripcion} <br/> <br/>
                                        Ubicación: {producto.ubicacion}
                                    </h5>
                                </div>
                                
                                {idUsuario == vendedor._id ? 
                                <form onSubmit={editarDescripcion} className='mb-3'>
                                    <div className="row mt-4 align-items-center">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-5">
                                            <input 
                                                value={descripcion}
                                                onChange={ (e) => setDescripcion(e.target.value)}
                                                type="text"
                                                className="form-control"
                                                placeholder="(Nueva Descipcion)"
                                                style={{ width: '100%'}}
                                                aria-label="Ingresar nueva descripcion"
                                                title="Ingresar nueva descripcion"
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <button type='submit' className="ms-2 btn btn-secondary">Modificar</button>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                </form> : null
                                
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompShowDetallesProducto;