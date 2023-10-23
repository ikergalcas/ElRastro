import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    comprador: {
        type: String
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
        type: [Number]
    },
    localizacion: {
        type: String 
    },
    precioActual: {
        type: Number
    },
    precioFinal: {
        type: Number
    },
    precioInicial: {
        type: Number
    },
    titulo: {
        type: Number
    },
    vendedor: {
        type: String
    }

})

export default mongoose.model('productos', productSchema)