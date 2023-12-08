import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import NavbarPage from "../navbar/navbar.js";   

const CompEditUser = () => {
    const {idUser} = useParams()

    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        getUsuario()
    }, []);

    const getUsuario = async () => {
        // Hacer la solicitud para obtener usuarios desde el backend
        fetch('http://localhost:3003/usuarios/'+idUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con el usuario obtenido
                setUsuario(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error al obtener usuario:', error);
            });
    }

    return (
        <html>
        <div>
            <NavbarPage></NavbarPage>
            <div className="container-fluid">
                <h1>{usuario.username}</h1>
            </div>
        </div>
        </html>
        
    )
}

export default CompEditUser