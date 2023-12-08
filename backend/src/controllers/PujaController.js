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
        const {precio} = req.body;

        const producto = await Producto.findById(idProducto)
        const listaPujas = producto.pujas
        for (const puja of listaPujas ) {
            if(puja._id == idPuja){
                const usuario = puja.usuario
                listaPujas.pull(puja);
                listaPujas.push(new Object ({
                    "precio": precio,
                    "usuario": usuario
                }));
            }    
        }
        const updatedProducto = await Producto.findByIdAndUpdate(idProducto, {pujas:listaPujas}, {new:true})

        if(!updatedProducto){
            return res.status(404).json({message : 'Producto o puja no encontrada' });
        }
        res.json("editando Puja");

    } catch (error) {
        console.log('Error en la consulta de Productos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Producto' });
    }
}


export const deletePuja = async (req, res) => {
    try {
        const { idPuja, idProducto } = req.params;

        const producto = await Producto.findById(idProducto)
        const listaPujas = producto.pujas
        for (const puja of listaPujas ) {
            if(puja._id == idPuja){
                listaPujas.pull(puja);
            }    
        }
        const updatedProducto = await Producto.findByIdAndUpdate(idProducto, {pujas:listaPujas}, {new:true})

        if(!updatedProducto){
            return res.status(404).json({message : 'Producto o puja no encontrada' });
        }
        res.json("borrando puja")

    } catch (error) {
        console.log('Error en la consulta de Productos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Producto' });
    }
}

//pujas usuario
export const getPujasUsuario = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const listaProductos = await Producto.find();
        
        const listaPujas = []
        for (const producto of listaProductos) {
            for(const puja of producto.pujas) {
                if (puja.usuario == idUsuario) {
                    listaPujas.push(puja)
                }
            }
        }

        res.json(listaPujas);

    } catch (error) {
        console.log('Error en la consulta de pujas en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener las pujas' })
    }
};

// $gt $gte $lt $lte
//pujas por precio
export const getPujasPrecio = async (req, res) => {
    try {
        const {idProducto} = req.params
        const {precio} = req.body
        const producto = await Producto.findById(idProducto)
        
        const listaPujas = []
        for(const puja of producto.pujas) {
            if (puja.precio <= precio) {
                listaPujas.push(puja)
            }
        }

        res.json(listaPujas);

    } catch (error) {
        console.log('Error en la consulta de pujas en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};