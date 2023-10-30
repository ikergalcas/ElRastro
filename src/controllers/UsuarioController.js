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