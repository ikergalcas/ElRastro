import Puja from "../models/PujaModel.js";

export const getAllPujas = async (req, res) => {
    try {
        const data = await Puja.find()

        console.log(data)

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de pujas en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};