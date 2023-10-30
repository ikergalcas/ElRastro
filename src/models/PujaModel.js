import mongoose from 'mongoose';

const pujaSchema = new mongoose.Schema({
    precio: {
        type: Number,
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,  //tipo ObjectId
        ref: 'productos',  //nombre del modelo
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'usuarios',  
    }
});

export default mongoose.model('pujas', pujaSchema);
