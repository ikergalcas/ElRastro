import React, { useState, useEffect } from 'react';

const CompShowDetallesProducto = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Hacer la solicitud para obtener productos desde el backend
        fetch('http://localhost:3001/productos/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los productos obtenidos
                setProductos(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    }, []);

    return (
        <div>
            <p>Mi Producto</p>
            <ul>
                {/* Mapear los productos y mostrarlos en una lista */}
                {productos.map(producto => (
                    <li key={producto._id}>
                        {producto.titulo} - {producto.descripcion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompShowDetallesProducto;
