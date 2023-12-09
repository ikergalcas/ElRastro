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
        fetch(`http://localhost:3001/productos/${idProducto}/pujas`, {
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

    },[]);


    
    const fechaFormateada = producto.fechaCierre ? producto.fechaCierre.slice(0, 10) : '';

    const crearPuja = async (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        console.log('Creando puja...');
    
        // Obtener el valor del precio del formulario
        const precioPuja = document.getElementById("precio").value;
        console.log('Precio de la puja:', precioPuja);
    
        // Crear el objeto de datos para la solicitud
        const datosPuja = {
            "precio": parseFloat(precioPuja), // Convertir el valor a número si es necesario
            "usuario": idUsuario
        };
        console.log('Datos de la puja:', datosPuja);
    
           // Convertir los datos a formato raw
            const rawDatosPuja = JSON.stringify(datosPuja);

        // Realizar la solicitud al backend
        fetch(`http://localhost:3001/productos/${idProducto}/crearPuja`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: rawDatosPuja, // Enviar datos en formato raw
        })
        .then(response => response.json())
        .then(data => {
            console.log('Puja realizada con éxito:', data);
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje al usuario7
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al realizar la puja:', error);
            // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario

        });
    }

    return (
        <div>
             {producto.vendedor !== idUsuario && (
            <div class="buscador-center col 4">
            <form
                id="formularioPuja"
                className="buscador-center"
                onSubmit={crearPuja}
            >
                <input
                    className='barrabusquedabig'
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Euros Puja"
                    required
                />
                <button className="botonBusqueda col 1" type="submit">Pujar</button>
            </form>
            </div>
            )}


            <b>FECHA FINAL DE PUJA:</b> {fechaFormateada}
            <div class="card">
                <div class="card body">
                    {Array.isArray(pujas) && pujas.length > 0 ? (
                    <ul class="list-group list-group-flush">
                        {pujas.map((puja, index) => (
                        <li key={index} class="list-group-item">
                            <p>
                            <b>Usuario:</b> {puja.usuario}
                            </p>
                            <p>
                            <b>Precio:</b> {puja.precio} €
                            </p>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>No hay pujas.</p>
                    )}
                </div>
                </div>
        
    </div>
    );
}

export default CompShowPujas;