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
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'usuarios',
    },
    comprador: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    vendido: {
        type: mongoose.Schema.Types.Boolean, 
        default: false
    }

},{ versionKey: false });

export default mongoose.model('productos', productSchema)