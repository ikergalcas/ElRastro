import React, { useState, useEffect } from 'react';
import { redirect, useParams } from 'react-router-dom';

const CompShowCrearProducto = () => {

    const idUsuario='653fe434b1b1e5d84c3ed746';
    const [titulo,setTitulo]=useState('')
    const [descripcion,setDescripcion]=useState('')
    const [ubicacion,setUbicacion]=useState('')
    const [precio,setPrecio]=useState('')
    const [fecha, setFecha]=useState('')
    const [idnuevoProducto,setProducto]=useState('')

    const mostrarParte2 = async(e) => {
        e.preventDefault()

        var raw = JSON.stringify({
            "descripcion": descripcion,
            "fechaCierre": fecha,
            "precioInicial": precio,
            "titulo": titulo,
            "ubicacion": ubicacion,
            "vendedor": idUsuario
          });

        fetch('http://localhost:3001/productos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw
        }).then(response => response.text())
            .then(result => {
                console.log(result)
                setProducto(result)
            })
            .catch(error => {
                console.error('Error al crear producto:', error);
            });
        document.getElementById('parte1').style.display = 'none';
        document.getElementById('parte2').style.display = 'block';
    }

    const subirFotoIdentificativa = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
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
                        console.log("este es el id:", idnuevoProducto)
                        console.log(result.imageUrl)
                        fetch(`http://localhost:3001/productos/${idnuevoProducto.replace(/"/g, '')}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: raw
                        }).then(response => response.text())
                        .then(result => {
                            console.log(result)
                            setProducto(result)
                            alert('Producto Creado');
                            window.location.href = '/productos';
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
        
    }

    const subirFotos = async(e) => {
        e.preventDefault()
        const input = document.getElementById('archivo');
        const archivos = input.files;
        if (archivos.length>0){    
            for (let i = 0; i < archivos.length; i++) {
                const archivo = archivos[i];
                console.log(archivo)
                var formdata = new FormData();
                formdata.append("foto", archivo);
        
                fetch('http://localhost:3001/productos/subirFoto', {
                        method: 'POST',
                        body : formdata
                    }).then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => {
                            console.error('Error al subir la imagen:', error);
                        });
            }
        }else{
            console.error('No se seleccionó ningún archivo.');
        }
    }

return(
    <div className='container1'>
        <div id="parte1" className="formularioCrear">
            <h2>Paso 1 de 2 </h2>
            <form id="formularioParte1" onSubmit={mostrarParte2}>
                <a>Título:</a><br/>
                <input value={titulo} onChange={(e) => setTitulo(e.target.value)} 
                type="text" id="titulo" className="form-control" required/>
                <br/>

                <a>Descripción:</a><br/>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} 
                id="descripcion" className="form-control" required></textarea>
                <br/>

                <a>Precio base:</a><br/>
                <input value={precio} onChange={(e) => setPrecio(e.target.value)} 
                type="number" id="precio" className="form-control" required/><span class="input-group-text">€</span>
                <br/>

                <a>Ubicacion:</a><br/>
                <input value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} 
                type="text" id="precio" className="form-control" required/>
                <br/>

                <a>Fecha de cierre de subasta:</a><br/>
                <input value={fecha} onChange={(e) => setFecha(e.target.value)} 
                type="date" id="precio" className="form-control" required/>
                <br/>

                <button className=" btn btn-secondary " type="submit" >Continuar</button>
            </form>
        </div>

        <div id="parte2" className="formularioCrear" style={{display: 'none'}}>
            <h2>Parte 2</h2>
            <form id="formularioParte2" onSubmit={subirFotoIdentificativa}>
                <a>Añade una foto representativa:</a><br/>
                <div style={{flexdirection: 'row'}} >
                    <input type="file" className="form-control" id="archivo" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept=".png , .jpg"/>
                    <button className="btn btn-secondary" type="submit" >Button</button>
                </div>
            </form>
        </div>        
    </div>

    )
}

export default CompShowCrearProducto;