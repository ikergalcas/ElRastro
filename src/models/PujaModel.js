import mongoose from 'mongoose'

const pujaSchema = new mongoose.Schema({
    precio: {
        type: Number
    },
    producto: {
        type: String
    },
    usuario: {
        type: String
    }

})

export default mongoose.model('puja', pujaSchema)