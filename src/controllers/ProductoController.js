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


export const createProducto = async (req, res) => {
    try {
        const { comentarios, descripcion, fechaCierre, foto, historialPujas, precioFinal, titulo, ubicacion, vendedor } = req.body

        const newProducto = new Producto({
            comentarios,
            descripcion,
            fechaCierre,
            foto,
            historialPujas,
            precioFinal,
            titulo,
            ubicacion,
            vendedor
        })

        await newProducto.save()

        res.send("creando producto")

    } catch (error) {
        console.log('Error en la consulta de productos a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un producto' });
    }
}

export const editProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada
        
        //buscamos user y modificamos
        const updatedProducto = await Producto.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedProducto){
            return res.status(404).json({message : 'Producto no encontrado' });
        }
        res.json(updatedProducto);

    } catch (error) {
        console.log('Error en la consulta de productos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un producto' });
    }
}


export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedProducto = await Producto.findByIdAndDelete(id);

        if(!searchedProducto){
            return res.status(404).json({message : 'Producto no encontrado' });
        }
        res.send("borrado")

    } catch (error) {
        console.log('Error en la consulta de productos a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un producto' });
    }
}

// operación que devuelva los productos ofertados por un usuario
export const getProductosdeUsuario = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const listaProductos = (await Producto.find({vendedor : idUsuario}).sort({fechaCierre: -1}));
        
        console.log(listaProductos)

        res.json(listaProductos);

    } catch (error) {
        console.log('Error en la consulta de productos en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los productos' })
    }
};