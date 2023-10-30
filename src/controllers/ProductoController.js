import Producto from "../models/ProductoModel.js";

export const getAllProductos = async (req, res) => {
    try {
        const data = await Producto.find()

        console.log(data)

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};