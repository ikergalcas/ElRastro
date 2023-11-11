import mongoose from 'mongoose' //Mongoose nos permite conectarnos a mongodb y tmb a modelar los datos

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://alvaroym21:rRGn9U768bIw8rVX@cluster0.dftplwi.mongodb.net/elRastro')
        console.log("Conexión establecida")        
    } catch (error) {
        console.log(error)
    }
};

