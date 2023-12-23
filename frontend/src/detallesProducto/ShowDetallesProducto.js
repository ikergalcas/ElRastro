import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'react-bootstrap';


const CompShowDetallesProducto = () => {
    const {idUsuario, idProducto} = useParams()
    const navigate = useNavigate()

    // Obtenemos el producto y el vendedor
    const [producto, setProducto] = useState({});
    const [vendedor, setVendedor] = useState({});
    const [comprador, setComprador] = useState(null)
    const [mostrarValoracion, setMostrarValoracion] = useState(false)
    const [calidad, setCalidad] = useState(1)
    const [fiabilidad, setFiabilidad] = useState(1)
    const [valoracionComprador, setValoracionComprador] = useState(1)
    const [idUserMaxPuja, setIdUserMaxPuja] = useState()
    const [precioEnvio, setPrecioEnvio] = useState()

    //CARRUSEL
    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    //Dentro de un useEffect hacemos las 2 consultas porque las solicitudes http son asincronas y en la
    //segunda consulta uso el atributo vendedor de la primera
    useEffect(() => {
        // Hacer la solicitud para obtener un producto desde el backend 
        fetch(`http://localhost:3001/productos/${idProducto}/checkeo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
        .then(data => {
            // Actualizar el estado con los productos obtenidos
            setProducto(data.producto);
            setIdUserMaxPuja(data.idUserMaxPuja)
            if(data.comprador != null) {
                setComprador(data.comprador)
            }

            // Hacer la solicitud para obtener el vendedor
            return fetch(`http://localhost:3003/usuarios/${data.producto.vendedor}`);
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

    //SUBASTA CERRADA + YO HE HECHO LA MAX PUJA     +   NO HE PAGADO
    if(producto.vendido && idUsuario == idUserMaxPuja && producto.comprador == null) {

    }
    
    const [fotoNueva, setFotoNueva] = useState(null);
    
    const nuevaFoto = async (foto) => {
        const archivos = foto ? [foto] : [];
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('http://localhost:3001/productos/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        var raw = JSON.stringify({
                            "foto" : result.imageUrl
                          });
                        fetch(`http://localhost:3001/productos/${idProducto}/nuevaImagen`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            setProducto(result)
                            alert('Imagen Añadida');
                            window.location.reload();
                        })
                            .catch(error => {
                                console.error('Error al subir la imagen:', error);
                            });
                            })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
        }else{
            console.error('No se seleccionó ningún archivo.');
        }
    };

    //---VALORACION---
    const valorar = () => {
        var raw = JSON.stringify({
            "idUsuario": idUsuario,
            "idProducto": idProducto,
            "fiabilidad": Number(fiabilidad),
            "calidad": Number(calidad),
            "valorComprador": Number(valoracionComprador),
        });
    
        console.log("Antes de la solicitud PUT");
        // Pongo el producto como valorado, recalculo la media de valoración y la actualizo
        fetch('http://localhost:3001/productos/valoracion/calculoValoracion', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        })
    }
    

    //---CANCELAR SUBASTA (BORRAR OBJETO)---
    const cancelarSubasta = () => {
        navigate(`/borrarSubasta/${idProducto}/${idUsuario}`)
    }

    //---CERRAR PUJA---
    const cerrarPuja = () => {
        var raw = JSON.stringify({
            "idProducto": idProducto,
        });

        fetch(`http://localhost:3001/productos/${idProducto}/cerrarPuja`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.json())
        .then(data => {
            setIdUserMaxPuja(data.id)
            setComprador(data.comprador)
        })
    }


    const subirFotoIdentificativa = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
        if (archivos.length>0){    
            const archivo = archivos[0];
            
            var formdata = new FormData();
            formdata.append("foto", archivo);
    
            fetch('http://localhost:3003/usuarios/subirFoto', {
                    method: 'POST',
                    body : formdata
                }).then(response => response.json())
                    .then(result =>{
                        var raw = JSON.stringify({
                            "foto" : result.imageUrl
                          });
                        console.log(result.imageUrl)
                        fetch(`http://localhost:3001/productos/${producto._id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            window.location.reload();
                        })
                            .catch(error => {
                                console.error('Error al subir la imagen:', error);
                            });
                            })
                    .catch(error => {
                        console.error('Error al subir la imagen:', error);
                    });
        }else{
            alert("Selecciona una foto");   
            console.error('No se seleccionó ningún archivo.');
        }
        
    }

    return (
        <div className='container' style={{marginTop: '3%'}}>
            <div className='row'>
                <div className='col 4'>
                    <div className='row'>
                        <div className='col'>
                            {idUsuario == vendedor._id ? 
                            <div>
                                {/* CAMBIAR IMAGEN PRINCIPAL */}
                               
                                {/* AÑADIR IMAGEN A LAS SECUNDARIAS 
                                <div className='row'>   
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => nuevaFoto(e.target.files[0])}
                                    />                                  
                                </div>
                                */}
                            </div>
                            
                            : null
                            }
                            <div>
                                <img src={producto.foto} className="card-img-top" style={{ objectFit: 'contain', height: '25vmin', textAlign: 'left'}}/>
                                {idUsuario == vendedor._id ? 
                                <form id="formularioParte2" onSubmit={subirFotoIdentificativa} style={{marginTop: '3%', width: '90%'}}>
                                <div style={{flexdirection: 'row', width:'90%'}} >
                                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg,.jpeg"/>
                                    <button className="btn btn-secondary mt-2" type="submit" >Cambiar foto</button>
                                </div>
                                </form>
                                : null} 
                            </div> 
                            {/*
                            <Carousel activeIndex={index} onSelect={handleSelect} style={{ maxWidth: '400px' }}>
                                {producto.imagenes && producto.imagenes.map((foto, idx) => (
                                    <Carousel.Item key={idx}>
                                    <img
                                        className="d-block w-100"
                                        src={foto}
                                        alt={`Foto ${idx + 1}`}
                                        style={{ maxHeight: '200px', objectFit: 'contain' }}
                                    />
                                    </Carousel.Item>
                                ))}
                                
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                                </Carousel>*/
                                }


                            {/* CAROUSEL SIN BOTONES ABAJO 
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                {producto.imagenes && producto.imagenes.map((foto, idx) => (
                                    <Carousel.Item key={idx}>
                                        <img
                                            className="d-block w-50"
                                            src={foto}
                                            alt={`Foto ${idx + 1}`}
                                        />
                                    </Carousel.Item>
                                ))
                            </Carousel>*/}
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col 2'>
                            <div className='card text-center mt-3'>
                                <div className='card-body'>
                                    <h3 className='card-title'>
                                        {/* ACCEDER A MI PROPIO PERFIL */
                                        idUsuario == vendedor._id ?
                                        <Link to={`/myUserInfo/${idUsuario}`} >{vendedor.username}</Link>

                                        /* ACCEDER A PERFIL AJENO */
                                        :
                                        <Link to={`/userInfo/${idUsuario}/${vendedor._id}`} >{vendedor.username}</Link>
                                        }
                                        
                                    </h3>
                                    Valoracion
                                        { /* Mostrar estrellas según la valoracionMedia */
                                        Array.from({ length: vendedor.valoracionMedia }).map((_, index) => (
                                            <span key={index} className="text-warning">&#9733;</span>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className='col 2'></div>
                    </div>
                </div>
                <div className='col 8'>
                    <div className='row'>
                        <div className='col 2'>
                            <h3 className='card-title'>
                                Producto: {producto.titulo}
                            </h3>
                        </div>
                        {producto.vendido && (
                        <div className='col 2'>
                            <h3 className='card-title'>VENDIDO</h3>
                        </div>
                        )}
                        <div className='col 2'>
                            <h3 className='card-title'>Puja mas alta: {producto.maximaPuja}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="card mb-4 h-100 w-100" style={{marginTop: '5%'}}>
                                <div className='card-body overflow-auto'>
                                    <h6 className='card-title'>
                                        {producto.descripcion} <br/> <br/>
                                        Ubicación: {producto.ubicacion} <br/>  <br/>
                                        Precio Inicial: {producto.precioInicial} <br/> <br/>
                                        Fecha de cierre: {new Date(producto.fechaCierre).toLocaleString()}
                                    </h6>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        {//----------------EDITAR----------------
                                        idUsuario == vendedor._id ? 
                                        <div>
                                            <Link to={`/editarProducto/${idUsuario}/${idProducto}`} className="btn btn-secondary m-2">Editar</Link>
                                        </div>
                                        : null
                                        }
                                    </div>
                                    <div className='col'>
                                        {//--COMPRA--
                                        producto.vendido && idUsuario == idUserMaxPuja && (
                                        <div>
                                            <Link className='btn btn-secondary' to={`/pago/${idUsuario}/${idProducto}`}>Comprar</Link>
                                        </div>
                                        )}

                                        {//--VALORACION--
                                        //----------------Comprador Valora Vendedor----------------
                                        idUsuario == producto.comprador && !producto.valoracionVendedor ?
                                        <div>
                                            <button className="btn btn-secondary" onClick={() => setMostrarValoracion(true)}>
                                            Dejar Valoración
                                            </button>

                                            {mostrarValoracion && (
                                                <form onSubmit={valorar}>
                                                    <label className='form-label'>Valora del 1 al 5 estos aspectos</label>
                                                    <br/>
                                                    
                                                    <a>Calidad del producto</a>
                                                    <input 
                                                    value={calidad} 
                                                    onChange={(e) => setCalidad(e.target.value)}
                                                    type="number" 
                                                    id="calidad" 
                                                    className='form-control' 
                                                    min="1"
                                                    max="5"
                                                    required
                                                    />
                                                    <br/>

                                                    <a>¿Te ha parecido confiable este vendedor?</a>
                                                    <input 
                                                    value={fiabilidad} 
                                                    onChange={(e) => setFiabilidad(e.target.value)}
                                                    type="number" 
                                                    id="fiabilidad" 
                                                    className='form-control'
                                                    min="1"
                                                    max="5" 
                                                    required/>
                                                    <br/>
                                                    <button className="btn btn-secondary" type="submit" >Enviar valoracion</button>
                                                </form>
                                            )}
                                            
                                        </div>
                                        : null
                                        }
                                        {//--Vendedor valora comprador--
                                        idUsuario == producto.vendedor && producto.comprador != null && !producto.valoracionComprador && producto.vendido ?
                                        <div>
                                            <button className="btn btn-secondary" onClick={() => setMostrarValoracion(true)}>
                                            Dejar Valoración
                                            </button>

                                            {mostrarValoracion && (
                                                <form onSubmit={valorar}>
                                                    <label className='form-label'>Valora del 1 al 5 estos aspectos</label>
                                                    <br/>
                                                    
                                                    <a>¿Cual ha sido tu experiencia con este comprador?</a>
                                                    <input 
                                                    value={valoracionComprador} 
                                                    onChange={(e) => setValoracionComprador(e.target.value)}
                                                    type="number" 
                                                    id="valComp" 
                                                    className='form-control' 
                                                    min="1"
                                                    max="5"
                                                    required
                                                    />
                                                    <br/>

                                                    <button className="btn btn-secondary" type="submit" >Enviar valoracion</button>
                                                </form>
                                            )}
                                            
                                        </div>
                                        : null
                                        }
                                    </div>
                                    <div className='col'>
                                        {//---Cancelar Subasta---//
                                        //Puedo cancelar la subasta si soy el vendedor y no tiene pujas
                                        idUsuario == producto.vendedor && producto.pujas && producto.pujas.length == 0 && (
                                            <form onSubmit={cancelarSubasta}>
                                                <button className='btn btn-secondary' type='submit'>Cancelar Subasta</button>
                                            </form>
                                        )}
                                        {//---Cerrar Puja--//
                                        //Puedo cerrar puja si soy el vendedor, no esta vendido y tiene pujas
                                        idUsuario == producto.vendedor && !producto.vendido && 
                                        producto.pujas && producto.pujas.length > 0 && ( 
                                        <form onSubmit={cerrarPuja}>
                                            <button className='btn btn-secondary' type='submit'>Cerrar Puja</button>
                                        </form>)
                                        }
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompShowDetallesProducto;