import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    comentarios: {
        type: [Number]
    },
    descripcion: {
        type: String
    },
    fechaCierre: {
        type: Date
    },
    foto: {
        type: String
    },
    historialPujas: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'pujas'
    },
    precioFinal: {
        type: Number
    },
    titulo: {
        type: String
    },
    ubicacion: {
        type: String 
    },
    vendedor: {
        type: String
    }

},{ versionKey: false });

export default mongoose.model('productos', productSchema)