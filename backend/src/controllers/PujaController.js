import Puja from "../models/PujaModel.js";
import Producto from "../models/ProductoModel.js";

export const getAllPujas = async (req, res) => {
    try {
        const {idProducto} = req.params
        const data = await Producto.findById(idProducto)
        res.json(data.pujas)

    } catch (error) {
        console.log('Error en la consulta de pujas en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};

export const createPuja = async (req, res) => {
    try {
        const {idProducto} = req.params
        const { precio, usuario } = req.body

        const newPuja = new Object({
            "precio": precio,
            "usuario": usuario
        })

        const data = await Producto.findById(idProducto)
        const listaPujas = data.pujas
        listaPujas.push(newPuja)

        await Producto.findByIdAndUpdate(idProducto, {pujas:listaPujas}, {new:true})

        res.send("añadiendo Puja")

    } catch (error) {
        console.log('Error en la consulta de pujas a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un puja' });
    }
}

export const editPuja = async (req, res) => {
    try {
        const { idPuja, idProducto } = req.params;
        const updateData = req.body;

        const producto = await Producto.findById(idProducto)
        const listaPujas = producto.listaPujas
        for (const puja of listaPujas ) {
            if(puja._id = idPuja){
                listaContactos.pull(puja);
                listaContactos.push(new Object (updateData));
            }    
        }
        const updatedProducto = await Producto.findByIdAndUpdate(idProducto, {pujas:listaPujas}, {new:true})

        if(!updatedProducto){
            return res.status(404).json({message : 'Producto o puja no encontrada' });
        }
        res.json(updatedProducto);

    } catch (error) {
        console.log('Error en la consulta de Productos a la base de datos:', error);
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