import React, { useState, useEffect } from 'react';

const ShowProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos()
    }, []);

    const getProductos = async () => {
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
    }

    const [busqueda, setBusqueda] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const buscarProductos = async (e) => {
        e.preventDefault()

        if(busqueda.size!=0 && !precioMax){
            console.log("desc")
            let raw = JSON.stringify({
                "descripcion": busqueda.toString()
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('http://localhost:3001/productos/descripcion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });
        }else if (busqueda.size==0 && precioMax ){
            console.log("precio")
            let raw = JSON.stringify({
                "precio": precioMax
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('http://localhost:3001/productos/preciomax', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });
            
        }else if (busqueda.size!=0 && precioMax){
            console.log("precio y desc");
            let raw = JSON.stringify({
                "descripcion": busqueda.toString(),
                "precio" : precioMax
              });
            // Hacer la solicitud para obtener productos desde el backend
            fetch('http://localhost:3001/productos/descripcionPrecio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : raw
            }).then(response => response.json())
                .then(data => {
                    // Actualizar el estado con los productos obtenidos
                    setProductos(data);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error al obtener productos:', error);
                });

        }else{
            limpiarSeleccion()
        }
    }

    const limpiarSeleccion = async () =>{
        setBusqueda("");
        setPrecioMax("");
        getProductos()
    }


return(
    <div>
        
        <div class="buscador">
            <form class="buscador" onSubmit={buscarProductos}>
                <input value={precioMax} className="barrabusqueda" onChange={(e) => setPrecioMax(e.target.value)} type="number" placeholder="Precio maximo" />
                <input value={busqueda} className="barrabusqueda" onChange={(e) => setBusqueda(e.target.value)} type="string" placeholder="Busca aquí ..." />
                <button class="botonBusqueda" type="submit" >Buscar</button>
                <button onClick={limpiarSeleccion} className="btn btn-outline-dark btn-sm" >Limpiar</button>
            </form>
        </div>


        <div class="container1" >
            <div className="row">
            {productos.length==0 ? (
                <p> No hay productos que cumplan con los criterios de búsqueda.</p> 
            ) : productos.map(producto => (
                <div class="card tarjeta col-md-3 " >
                    <div className="card-body">
                        <img className="card-img-top" src={producto.foto} alt={producto.titulo} style={{ objectFit: 'cover', height: '200px' }} />
                        <h5 className="card-title">{producto.titulo}</h5>
                        <p className="card-title">{producto.descripcion}</p>
                    </div>
                </div>
             ))}
            </div>
        </div>

    </div>


    )
}

export default ShowProductos