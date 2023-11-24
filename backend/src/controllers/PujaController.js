import Puja from "../models/PujaModel.js";

export const getAllPujas = async (req, res) => {
    try {
        const data = await Puja.find()

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de pujas en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

export const createPuja = async (req, res) => {
    try {
        const { precio, producto, usuario } = req.body

        const newPuja = new Puja({
            precio,
            producto,
            usuario
        })

        await newPuja.save()

        res.send("creando")

    } catch (error) {
        console.log('Error en la consulta de pujas a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un puja' });
    }
}

export const editPuja = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada

        //buscamos user y modificamos
        const updatedPuja = await Puja.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedPuja){
            return res.status(404).json({message : 'Puja no encontrado' });
        }
        res.json(updatedPuja);

    } catch (error) {
        console.log('Error en la consulta de PujaS a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Puja' });
    }
}


export const deletePuja = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedPuja = await Puja.findByIdAndDelete(id);

        if(!searchedPuja){
            return res.status(404).json({message : 'Puja no encontrado' });
        }
        res.send("borrada")

    } catch (error) {
        console.log('Error en la consulta de PujaS a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Puja' });
    }
}

//pujas de un producto
export const getPujaProducto = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const listaPujas = (await Puja.find({producto: idProducto}).sort({precio : -1}));

        res.json(listaPujas);

    } catch (error) {
        console.log('Error en la consulta de pujas en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

//pujas usuario
export const getPujaUsuario = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const listaPujas = (await Puja.find({usuario: idUsuario}).sort({precio : 1}));

        res.json(listaPujas);

    } catch (error) {
        console.log('Error en la consulta de pujas en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

// $gt $gte $lt $lte
//pujas por precio
export const getPujaPrecio = async (req, res) => {
    try {
        const {precio} = req.body;
        const listaPujas = (await Puja.find({precio: {$lte:precio}}));

        res.json(listaPujas);

    } catch (error) {
        console.log('Error en la consulta de pujas en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};