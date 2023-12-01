import Comentario from "../models/ComentarioModel.js";

export const getAllComentarios = async (req, res) => {
    try {
        const data = await Comentario.find()

        res.json(data)

    } catch (error) {
        console.log('Error en la consulta de Comentarios en la base de datos: ', error)
        res.status(500).json({ message: 'Error al obtener los Comentarios' })
    }
};

export const createComentario = async (req, res) => {
    try {
        const { texto, producto, usuario } = req.body

        const newComentario = new Comentario({
            usuario,
            producto,
            texto
        })

        await newComentario.save()

        res.send("creando")

    } catch (error) {
        console.log('Error en la consulta de Comentarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al crear un Comentario' });
    }
}

export const editComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; //la info modificada

        //buscamos user y modificamos
        const updatedComentario = await Comentario.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedComentario){
            return res.status(404).json({message : 'Comentario no encontrado' });
        }
        res.json(updatedComentario);

    } catch (error) {
        console.log('Error en la consulta de ComentarioS a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Comentario' });
    }
}


export const deleteComentario = async (req, res) => {
    try {
        const { id } = req.params;

        //buscamos user y borramos
        const searchedComentario = await Comentario.findByIdAndDelete(id);

        if(!searchedComentario){
            return res.status(404).json({message : 'Comentario no encontrado' });
        }
        res.send("borrada")

    } catch (error) {
        console.log('Error en la consulta de Comentarios a la base de datos:', error);
        res.status(500).json({ message: 'Error al editar un Comentario' });
    }
}