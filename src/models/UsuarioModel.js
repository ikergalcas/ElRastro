import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, //Esto hace que sea obligatorio que este atributo tenga un valor
        trim: true,     //Esto hace que si hay espacios no los tiene en cuenta
        unique: true
    },
    valoracion: {
        type: Number,
    }
})

export default mongoose.model('usuarios', userSchema)