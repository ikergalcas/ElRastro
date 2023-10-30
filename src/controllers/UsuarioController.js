import Usuario from '../models/UsuarioModel.js'

export const getAllUsuarios = async (req, res) => {
    try {
        const data = await Usuario.find()

        console.log(data)

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de usuarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { contacto, ubicacion, username } = req.body

        const newUser = new Usuario({
            contacto,
            ubicacion,
            username
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