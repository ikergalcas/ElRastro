import mongoose from 'mongoose'

const comentarioSchema = new mongoose.Schema({
    usuario: {
        type: [mongoose.Schema.Types.ObjectId],
        require: true
    },
    producto:{
        type: [mongoose.Schema.Types.ObjectId],
        require: true
    },
    texto: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
},{ versionKey: false });

export default mongoose.model('comentarios', comentarioSchema)