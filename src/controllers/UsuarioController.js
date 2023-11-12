import Usuario from '../models/UsuarioModel.js'
import Producto from "../models/ProductoModel.js";

export const getAllUsuarios = async (req, res) => {
    try {
        const data = await Usuario.find()

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { contacto, ubicacion, username, valoracionMedia } = req.body

        const newUser = new Usuario({
            contacto,
            ubicacion,
            username,
            valoracionMedia
        })

        await newUser.save()

        res.send("registrando")

    } catch (error) {
        console.log('Error en la consulta de usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un usuario' });
    }
}

export const editUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada

        //buscamos user y modificamos
        const updatedUser = await Usuario.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedUser){
            return res.status(404).json({message : 'User no encontrado' });
        }
        res.json(updatedUser);

    } catch (error) {
        console.log('Error en la consulta de usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un usuario' });
    }
}


export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedUser = await Usuario.findByIdAndDelete(id);

        if(!searchedUser){
            return res.status(404).json({message : 'User no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log('Error en la consulta de usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un usuario' });
    }
}

export const getUsuarioNombre = async (req, res) => {
    try {
        const {username}  = req.body;
        const listaUsuarios = (await Usuario.find({username: {$regex: username, $options:"i"}}));

        res.json(listaUsuarios);

    } catch (error) {
        console.log('Error en la consulta de usuarios en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener el usuarios' })
    }
};

export const getUsuarioValoracion = async (req, res) => {
    try {
        const {valoracionMedia} = req.body;
        const listaUsuarios = (await Usuario.find({valoracionMedia: {$gte:valoracionMedia}}));

        res.json(listaUsuarios);

    } catch (error) {
        console.log('Error en la consulta de usuarios en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los usuarios' })
    }
};

export const getCompradores = async (req, res) => {
    try {
        const {username}  = req.body;
        const usuario = (await Usuario.findOne({username: username}));
        const listaProductos = (await Producto.find({vendedor: usuario._id}));
        const listaIdCompradores = listaProductos.map((producto) => producto.comprador);

        const listaCompradores = [];
        
        for (const comprador of listaIdCompradores) {
            const compradorObjeto = await Usuario.findById(comprador);
            listaCompradores.push(compradorObjeto);
        }

        res.json(listaCompradores);

    } catch (error) {
        console.log('Error en la consulta de usuarios en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener el usuario' })
    }
};

export const getUbiUsuario = async (req, res) => {
    try {
        const {idUsuario} = req.params;
        const usuario = await Usuario.findById(idUsuario);
        if(usuario) {
            const locationName = usuario.ubicacion;
            //const locationName = "Calle babor, 13, Malaga";
            const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;

            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                const firstResult = data[0];
                const latitude = parseFloat(firstResult.lat);
                const longitude = parseFloat(firstResult.lon);
                res.json(`Latitud: ${latitude}, Longitud: ${longitude}`);
                } else {
                console.log("Ubicación no encontrada");
                }
            })
            .catch(error => {
                console.error("Error en la solicitud de geocodificación: " + error);
            });
        }

    } catch (error) {
        
    }
};



